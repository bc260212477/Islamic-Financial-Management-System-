<?php
namespace App\Http\Controllers;
use App\Models\Business; use App\Models\Holding; use App\Models\Transaction; use Illuminate\Http\Request;
class ReportController extends Controller {
    private function summary() { return ['income'=>(float)Transaction::where('direction','in')->where('type','!=','transfer')->sum('amount'),'expenses'=>(float)Transaction::where('direction','out')->where('type','!=','transfer')->sum('amount'),'portfolio'=>(float)Holding::sum('current_value'),'businesses'=>Business::count(),'transactions'=>Transaction::count()]; }
    public function index() { return view('reports.index',['s'=>$this->summary()]); }
    public function csv() { $s=$this->summary(); $csv="metric,amount\n".collect($s)->map(fn($v,$k)=>"{$k},{$v}")->implode("\n"); return response($csv,200,['Content-Type'=>'text/csv','Content-Disposition'=>'attachment; filename=barakah-report.csv']); }
}
