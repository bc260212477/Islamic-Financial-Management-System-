<?php
namespace App\Http\Controllers;
use App\Models\Goal; use App\Services\Calculators; use Illuminate\Http\Request;
class GoalController extends Controller {
    public function index() { $goals = Goal::orderBy('name')->get()->map(function($g){ $g->months = Calculators::goalMonths((float)$g->target_amount,(float)$g->current_amount,(float)$g->monthly_saving); $g->progress = $g->target_amount>0 ? min(100, round($g->current_amount/$g->target_amount*100,1)) : 0; return $g; }); return view('goals.index', compact('goals')); }
    public function store(Request $r) { $d=$r->validate(['name'=>['required','string','max:255'],'target_amount'=>['required','numeric','gt:0'],'current_amount'=>['nullable','numeric','min:0'],'monthly_saving'=>['nullable','numeric','min:0'],'target_date'=>['nullable','date']]); Goal::create($d); return back()->with('status','Goal created.'); }
    public function destroy(Goal $g) { $g->delete(); return back(); }
}
