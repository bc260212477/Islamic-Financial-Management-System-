<?php
namespace App\Http\Controllers;
use App\Models\Assessment; use App\Models\HabitLog; use App\Models\HealthLog; use App\Models\Holding; use App\Models\JournalEntry; use App\Models\ReadingLog; use App\Models\Skill; use App\Models\Transaction; use App\Services\ElitePath; use Illuminate\Http\Request;
class GrowthController extends Controller {
    public function index() {
        $elite = ElitePath::evaluate(['active_days'=>Transaction::distinct('date')->count('date'),'habit_pct_60d'=>0,'under_budget_60d'=>false,'emergency_months'=>0,'halal_holdings'=>Holding::count(),'business_monthly'=>0,'nw_growth_pct'=>0,'riba_debt'=>0]);
        return view('growth.index',['elite'=>$elite,'journal'=>JournalEntry::orderByDesc('date')->limit(10)->get(),'reading'=>ReadingLog::orderByDesc('date')->limit(10)->get(),'skills'=>Skill::orderBy('name')->get(),'assessments'=>Assessment::latest()->limit(5)->get(),'health'=>HealthLog::orderByDesc('date')->limit(7)->get()]);
    }
    public function storeJournal(Request $r) { $d=$r->validate(['date'=>['required','date'],'mood'=>['nullable','string','max:30'],'gratitude'=>['nullable','string'],'reflection'=>['nullable','string'],'wins'=>['nullable','string'],'lessons'=>['nullable','string']]); JournalEntry::create($d); return back(); }
    public function storeReading(Request $r) { $d=$r->validate(['book_title'=>['required','string','max:255'],'pages_read'=>['required','integer','min:0'],'date'=>['required','date']]); ReadingLog::create($d); return back(); }
    public function storeSkill(Request $r) { $d=$r->validate(['name'=>['required','string','max:255'],'level'=>['required','integer','between:1,10'],'target_level'=>['nullable','integer','between:1,10']]); Skill::create($d); return back(); }
    public function storeAssessment(Request $r) { $d=$r->validate(['type'=>['required','in:big-five,mbti,enneagram'],'results'=>['required','string']]); Assessment::create(['type'=>$d['type'],'results_json'=>['summary'=>$d['results']],'taken_at'=>now()]); return back(); }
    public function storeHealth(Request $r) { $d=$r->validate(['date'=>['required','date'],'sleep_hours'=>['nullable','numeric'],'steps'=>['nullable','integer'],'weight'=>['nullable','numeric'],'water_ml'=>['nullable','integer'],'mood'=>['nullable','string','max:30']]); HealthLog::create($d); return back(); }
}
