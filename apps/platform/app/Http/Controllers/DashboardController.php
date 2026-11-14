<?php
namespace App\Http\Controllers;
use App\Models\Account; use App\Models\Goal; use App\Models\Holding; use App\Models\Transaction; use App\Services\Calculators;
class DashboardController extends Controller {
    public function __invoke() {
        $income=(float)Transaction::where('direction','in')->where('type','!=','transfer')->sum('amount');
        $expenses=(float)Transaction::where('direction','out')->where('type','!=','transfer')->sum('amount');
        $holdings=(float)Holding::sum('current_value'); $accounts=(float)Account::sum('opening_balance');
        $netWorth=$accounts+$holdings; $savingsRate=Calculators::savingsRate($income,$expenses);
        [$health,$indicators]=Calculators::healthScore(['savings_rate'=>$savingsRate,'emergency_months'=>$expenses>0? $accounts/ max($expenses,1):null,'expense_ratio'=>$income>0?$expenses/$income:null,'goal_progress'=>Goal::count()? (float)Goal::avg('current_amount'):null]);
        return view('dashboard', compact('income','expenses','holdings','accounts','netWorth','savingsRate','health','indicators'));
    }
}
