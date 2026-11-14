<?php

namespace Tests\Feature;

use App\Models\Account;
use App\Models\Habit;
use App\Models\Task;
use App\Models\Transaction;
use App\Models\User;
use App\Services\ElitePath;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LifeOsTest extends TestCase
{
    use RefreshDatabase;

    public function test_family_expense_links_into_cash_flow(): void
    {
        $u = User::factory()->create();
        $a = Account::withoutGlobalScopes()->create(['user_id' => $u->id, 'name' => 'Main', 'kind' => 'bank', 'currency' => 'PKR', 'opening_balance' => 0]);
        $this->actingAs($u);
        $this->post('/family/members', ['name' => 'Mother', 'relation' => 'mother']);
        $member = \App\Models\FamilyMember::first();
        $this->post('/family/expenses', ['family_member_id' => $member->id, 'account_id' => $a->id, 'amount' => 500, 'date' => today()->toDateString()]);
        $this->assertSame(500.0, (float) Transaction::where('direction', 'out')->sum('amount')); // appears in cash flow
    }

    public function test_habit_toggle_and_task_overdue_and_elite(): void
    {
        $u = User::factory()->create();
        $this->actingAs($u);
        $this->post('/habits', ['name' => 'Fajr']);
        $h = Habit::first();
        $this->post('/habits/'.$h->id.'/toggle');
        $this->get('/habits')->assertSee('streak 1d');
        Task::create(['title' => 'Old task', 'due_date' => today()->subDay(), 'status' => 'todo']);
        $this->get('/tasks')->assertSee('OVERDUE');
        $elite = ElitePath::evaluate(['active_days' => 30, 'habit_pct_60d' => 90, 'under_budget_60d' => true, 'emergency_months' => 3, 'halal_holdings' => 3, 'business_monthly' => 0, 'nw_growth_pct' => 0, 'riba_debt' => 0]);
        $this->assertSame(3, $elite['level']); // Investor
    }

    public function test_assistant_reads_habits_and_tasks(): void
    {
        $u = User::factory()->create();
        $this->actingAs($u);
        $this->post('/assistant/chat', ['question' => 'What should I fix today?']);
        $this->get('/assistant')->assertSee('habits')->assertSee('tasks open');
    }
}
