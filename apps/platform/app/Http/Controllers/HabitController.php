<?php
namespace App\Http\Controllers;
use App\Models\Habit; use App\Models\HabitLog; use Illuminate\Http\Request; use Illuminate\Support\Carbon;
class HabitController extends Controller {
    public function index() {
        $habits = Habit::with('logs')->orderBy('name')->get()->map(function($h){
            $done = $h->logs->where('completed',true)->pluck('date')->map(fn($d)=>Carbon::parse($d)->toDateString())->all();
            $streak=0; $cursor=today(); while (in_array($cursor->toDateString(),$done)) { $streak++; $cursor=$cursor->subDay(); }
            $last30 = collect($done)->filter(fn($d)=>$d>=today()->subDays(29)->toDateString())->count();
            $h->streak=$streak; $h->pct30=round($last30/30*100); $h->doneToday=in_array(today()->toDateString(),$done); return $h; });
        return view('habits.index', compact('habits'));
    }
    public function store(Request $r) { $d=$r->validate(['name'=>['required','string','max:255'],'category'=>['nullable','string','max:50'],'color'=>['nullable','string','max:9']]); Habit::create($d); return back()->with('status','Habit created.'); }
    public function toggle(Habit $h) { $log = HabitLog::where('habit_id',$h->id)->where('date',today()->toDateString())->first(); if ($log) $log->delete(); else HabitLog::create(['habit_id'=>$h->id,'date'=>today()->toDateString(),'completed'=>true]); return back(); }
}
