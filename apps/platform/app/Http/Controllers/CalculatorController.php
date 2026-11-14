<?php
namespace App\Http\Controllers;
use App\Services\Calculators; use Illuminate\Http\Request;
class CalculatorController extends Controller {
    public function index(Request $r) {
        $zakat = Calculators::zakat((float)$r->input('cash',18500),(float)$r->input('gold_value',4200),(float)$r->input('business_assets',0),(float)$r->input('debts',2100),(float)$r->input('gold_price',78));
        $screen = Calculators::screening((float)$r->input('debt_ratio',28),(float)$r->input('inv_ratio',24));
        $cagr = Calculators::cagr((float)$r->input('cagr_start',100000),(float)$r->input('cagr_end',150000),(float)$r->input('cagr_years',3));
        return view('calculators.index', compact('zakat','screen','cagr'));
    }
}
