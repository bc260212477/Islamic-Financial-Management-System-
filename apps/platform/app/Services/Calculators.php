<?php

namespace App\Services;

/** Pure financial calculators. Every method maps to a FINANCIAL-RULES.md FIN-id. No I/O. */
class Calculators
{
    /** FIN-03 */
    public static function cashFlow(float $income, float $expenses): float
    {
        return round($income - $expenses, 2);
    }

    /** FIN-05 */
    public static function returnPct(float $invested, float $value): float
    {
        return $invested == 0.0 ? 0.0 : round((($value - $invested) / $invested) * 100, 1);
    }

    /** FIN-11/FIN-12 */
    public static function zakat(float $cash, float $goldValue, float $business, float $debts, float $goldPricePerGram): array
    {
        $net = $cash + $goldValue + $business - $debts;
        $nisab = 85 * $goldPricePerGram;
        $eligible = $net >= $nisab;

        return ['net' => round($net, 2), 'nisab' => round($nisab, 2), 'eligible' => $eligible,
            'zakat' => $eligible ? round($net * 0.025, 2) : 0.0,
            'progress' => $nisab > 0 ? max(0, min(100, round($net / $nisab * 100, 1))) : 0];
    }

    /** ISLAMIC-FINANCE screening */
    public static function screening(float $debtRatio, float $invRatio): array
    {
        $d = $debtRatio <= 33;
        $i = $invRatio <= 30;
        $stars = ($debtRatio < 20 && $invRatio < 15) ? 5 : (($d && $i) ? 4 : (($d xor $i) ? 3 : 1));

        return ['debt_pass' => $d, 'inv_pass' => $i, 'stars' => $stars, 'verdict' => ($d && $i) ? 'halal' : 'review'];
    }

    /** FIN-13 */
    public static function purification(float $dividend, float $nonCompliantIncomeRatio): float
    {
        return round($dividend * $nonCompliantIncomeRatio, 2);
    }

    /** FIN-20 */
    public static function cagr(float $start, float $end, float $years): float
    {
        return ($start <= 0 || $years <= 0) ? 0.0 : round((pow($end / $start, 1 / $years) - 1) * 100, 2);
    }

    public static function roi(float $cost, float $gain): float
    {
        return $cost == 0.0 ? 0.0 : round((($gain - $cost) / $cost) * 100, 2);
    }

    public static function savingsRate(float $income, float $expenses): float
    {
        return $income == 0.0 ? 0.0 : round((($income - $expenses) / $income) * 100, 1);
    }

    /** FIN-14 no-profit case */
    public static function goalMonths(float $target, float $current, float $monthly): int
    {
        return $monthly <= 0 ? PHP_INT_MAX : (int) ceil(max(0, $target - $current) / $monthly);
    }

    /** FIN-19 transparent health score; returns [score|null, indicators[]] */
    public static function healthScore(array $m): array
    {
        $ind = [];
        $add = function ($key, $score, $max) use (&$ind) {
            if ($score !== null) {
                $ind[$key] = ['score' => round(max(0, min($max, $score)), 1), 'max' => $max];
            }
        };
        $add('savings_rate', isset($m['savings_rate']) ? $m['savings_rate'] / 30 * 20 : null, 20);
        $add('emergency_months', isset($m['emergency_months']) ? $m['emergency_months'] / 6 * 15 : null, 15);
        $add('debt_burden', isset($m['debt_ratio']) ? 15 * (1 - $m['debt_ratio']) : null, 15);
        $add('expense_ratio', isset($m['expense_ratio']) ? 10 * (1 - $m['expense_ratio']) : null, 10);
        $add('diversification', isset($m['largest_source_share']) ? 10 * (1 - $m['largest_source_share']) : null, 10);
        $add('goal_progress', isset($m['goal_progress']) ? $m['goal_progress'] / 100 * 10 : null, 10);
        $add('net_worth_trend', isset($m['net_worth_trend']) ? ($m['net_worth_trend'] > 0 ? 5 : ($m['net_worth_trend'] == 0 ? 2.5 : 0)) : null, 5);
        if (count($ind) < 3) {
            return [null, $ind];
        }

        return [round(array_sum(array_column($ind, 'score')), 1), $ind];
    }
}
