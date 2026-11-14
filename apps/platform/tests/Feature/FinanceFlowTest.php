<?php

namespace Tests\Feature;

use App\Models\Account;
use App\Models\Business;
use App\Models\MarketInstrument;
use App\Models\MarketPrice;
use App\Models\MarketSector;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FinanceFlowTest extends TestCase
{
    use RefreshDatabase;

    private function userWithAccount(): array
    {
        $u = User::factory()->create();
        $a = Account::withoutGlobalScopes()->create(['user_id' => $u->id, 'name' => 'Main', 'kind' => 'bank', 'currency' => 'PKR', 'opening_balance' => 0]);

        return [$u, $a];
    }

    public function test_transfer_is_neutral_and_business_separated(): void
    {
        [$u, $a] = $this->userWithAccount();
        $b2 = Account::withoutGlobalScopes()->create(['user_id' => $u->id, 'name' => 'Cash', 'kind' => 'cash', 'currency' => 'PKR', 'opening_balance' => 0]);
        $biz = Business::create(['name' => 'Shop']);
        $this->actingAs($u);
        Transaction::create(['account_id' => $a->id, 'direction' => 'in', 'type' => 'job', 'counterparty' => 'Salary', 'amount' => 1000, 'currency' => 'PKR', 'date' => today()]);
        Transaction::create(['account_id' => $a->id, 'business_id' => $biz->id, 'direction' => 'in', 'type' => 'business', 'counterparty' => 'Sale', 'amount' => 500, 'currency' => 'PKR', 'date' => today()]);
        $this->post('/transactions/transfer', ['from_account_id' => $a->id, 'to_account_id' => $b2->id, 'amount' => 200, 'date' => today()->toDateString()])->assertRedirect();
        $income = Transaction::where('direction', 'in')->where('type', '!=', 'transfer')->sum('amount');
        $this->assertSame(1500.0, (float) $income); // transfer excluded (FIN-21)
        $this->get('/businesses')->assertSee('500');
    }

    public function test_sector_scope_changes_kpis(): void
    {
        [$u] = $this->userWithAccount();
        $mk = function ($sectorName, $symbol, $chg) {
            $s = MarketSector::create(['index_code' => 'KMI-30', 'name' => $sectorName]);
            $i = MarketInstrument::create(['sector_id' => $s->id, 'symbol' => $symbol, 'name' => $symbol, 'market_cap' => 100]);
            MarketPrice::create(['instrument_id' => $i->id, 'date' => today(), 'close' => 100, 'change_pct' => $chg, 'volume' => 1, 'data_mode' => 'Demo']);

            return $s;
        };
        $energy = $mk('Energy', 'E1', 5);
        $banks = $mk('Banks', 'B1', -5);
        $this->actingAs($u);
        $e = $this->get('/market?sector='.$energy->id)->assertOk()->assertSee('E1')->assertDontSee('B1');
        $this->get('/market?sector='.$banks->id)->assertOk()->assertSee('B1')->assertDontSee('E1');
    }

    public function test_assistant_cites_and_refuses_trades(): void
    {
        [$u, $a] = $this->userWithAccount();
        $this->actingAs($u);
        Transaction::create(['account_id' => $a->id, 'direction' => 'out', 'type' => 'other', 'counterparty' => 'Food', 'amount' => 50, 'currency' => 'PKR', 'date' => today()]);
        $this->post('/assistant/chat', ['question' => 'How much did I spend?'])->assertRedirect();
        $this->get('/assistant')->assertSee('FIN-03');
        $this->post('/assistant/chat', ['question' => 'Should I buy this stock?']);
        $this->get('/assistant')->assertSee("can't give trading instructions");
    }

    public function test_report_csv_downloads(): void
    {
        [$u] = $this->userWithAccount();
        $this->actingAs($u)->get('/reports/csv')->assertOk()->assertDownload('barakah-report.csv');
    }
}
