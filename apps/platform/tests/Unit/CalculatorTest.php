<?php

namespace Tests\Unit;

use App\Services\Calculators;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase
{
    public function test_zakat_worked_example_fin11(): void
    {
        $r = Calculators::zakat(18500, 4200, 0, 2100, 78);
        $this->assertSame(20600.0, $r['net']);
        $this->assertSame(6630.0, $r['nisab']);
        $this->assertSame(515.0, $r['zakat']);
        $this->assertTrue($r['eligible']);
        $below = Calculators::zakat(5000, 0, 0, 0, 78);
        $this->assertSame(0.0, $below['zakat']);
        $this->assertFalse($below['eligible']);
    }

    public function test_screening_stars(): void
    {
        $this->assertSame(4, Calculators::screening(28, 24)['stars']);
        $this->assertSame(5, Calculators::screening(19, 14)['stars']);
        $this->assertSame(3, Calculators::screening(40, 24)['stars']);
        $this->assertSame(1, Calculators::screening(40, 35)['stars']);
    }

    public function test_returns_cagr_purification_goal(): void
    {
        $this->assertSame(15.4, Calculators::returnPct(12000, 13850));
        $this->assertSame(-7.0, Calculators::returnPct(6000, 5580));
        $this->assertSame(10.0, Calculators::cagr(100, 121, 2));
        $this->assertSame(40.0, Calculators::purification(1000, 0.04));
        $this->assertSame(10, Calculators::goalMonths(120000, 20000, 10000));
    }

    public function test_health_score_needs_three_indicators(): void
    {
        [$score] = Calculators::healthScore(['savings_rate' => 15]);
        $this->assertNull($score);
        [$score2, $ind] = Calculators::healthScore(['savings_rate' => 30, 'emergency_months' => 6, 'debt_ratio' => 0.0, 'expense_ratio' => 0.5]);
        $this->assertSame(20.0 + 15.0 + 15.0 + 5.0, $score2);
    }
}
