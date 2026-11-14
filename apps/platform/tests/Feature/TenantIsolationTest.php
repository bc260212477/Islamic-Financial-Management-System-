<?php

namespace Tests\Feature;

use App\Models\Account;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenantIsolationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_cannot_see_another_users_accounts_in_list(): void
    {
        $a = User::factory()->create();
        $b = User::factory()->create();
        Account::withoutGlobalScopes()->create(['user_id' => $a->id, 'name' => 'Alpha Private Account', 'kind' => 'bank', 'currency' => 'PKR', 'opening_balance' => 100]);

        $this->actingAs($b)->get('/accounts')->assertOk()->assertDontSee('Alpha Private Account');
        $this->actingAs($a)->get('/accounts')->assertOk()->assertSee('Alpha Private Account');
    }

    public function test_model_queries_are_tenant_scoped(): void
    {
        $a = User::factory()->create();
        $b = User::factory()->create();
        Account::withoutGlobalScopes()->create(['user_id' => $a->id, 'name' => 'Scoped Account', 'kind' => 'cash', 'currency' => 'PKR', 'opening_balance' => 0]);

        $this->actingAs($b);
        $this->assertSame(0, Account::count());
        $this->actingAs($a);
        $this->assertSame(1, Account::count());
    }

    public function test_guests_cannot_open_accounts(): void
    {
        $this->get('/accounts')->assertRedirect('/login');
    }
}
