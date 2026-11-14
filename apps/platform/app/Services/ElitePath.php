<?php
namespace App\Services;
class ElitePath {
    /** Levels 1 Aware -> 5 Elite from real checkpoints only. */
    public static function evaluate(array $m): array {
        $checks = [
            'logged_30d' => ($m['active_days'] ?? 0) >= 30,
            'habits_80_60d' => ($m['habit_pct_60d'] ?? 0) >= 80,
            'under_budget_60d' => ($m['under_budget_60d'] ?? false) === true,
            'emergency_3m' => ($m['emergency_months'] ?? 0) >= 3,
            'diversified_halal' => ($m['halal_holdings'] ?? 0) >= 3,
            'business_income' => ($m['business_monthly'] ?? 0) >= 100000,
            'net_worth_growth_20' => ($m['nw_growth_pct'] ?? 0) >= 20,
            'no_riba_debt' => ($m['riba_debt'] ?? 1) == 0,
        ];
        $level = 1;
        if ($checks['logged_30d']) $level = 2;
        if ($level===2 && $checks['habits_80_60d'] && $checks['under_budget_60d']) $level = 2; // disciplined gate below
        if (($m['active_days']??0)>=30 && ($m['habit_pct_60d']??0)>=80 && ($m['under_budget_60d']??false)) $level = 2;
        if ($level>=2 && $checks['emergency_3m'] && $checks['diversified_halal']) $level = 3;
        if ($level>=3 && $checks['business_income']) $level = 4;
        if ($level>=4 && $checks['net_worth_growth_20'] && $checks['no_riba_debt']) $level = 5;
        $names = [1=>'Aware',2=>'Disciplined',3=>'Investor',4=>'Builder',5=>'Elite'];
        return ['level'=>$level,'name'=>$names[$level],'checks'=>$checks,'passed'=>count(array_filter($checks)),'total'=>count($checks)];
    }
}
