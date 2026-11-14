<?php
namespace App\Http\Controllers;
use App\Models\Habit; use App\Models\LifeProject; use App\Models\Routine; use App\Models\Task; use Illuminate\Http\Request;
class TaskController extends Controller {
    public function index() { $tasks=Task::orderByRaw("CASE status WHEN 'todo' THEN 0 WHEN 'doing' THEN 1 ELSE 2 END")->orderBy('due_date')->get(); $projects=LifeProject::orderBy('name')->get(); $routines=Routine::with('items')->get(); $habits=Habit::orderBy('name')->get(); return view('tasks.index', compact('tasks','projects','routines','habits')); }
    public function store(Request $r) { $d=$r->validate(['title'=>['required','string','max:255'],'project_id'=>['nullable','uuid'],'due_date'=>['nullable','date'],'priority'=>['nullable','in:low,medium,high'],'status'=>['nullable','in:todo,doing,done']]); Task::create($d); return back()->with('status','Task added.'); }
    public function move(Request $r, Task $t) { $d=$r->validate(['status'=>['required','in:todo,doing,done']]); $t->update($d); return back(); }
    public function storeRoutine(Request $r) { $d=$r->validate(['name'=>['required','string','max:255'],'days_of_week'=>['nullable','string','max:50']]); Routine::create($d); return back()->with('status','Routine added.'); }
    public function storeRoutineItem(Request $r) { $d=$r->validate(['routine_id'=>['required','uuid'],'title'=>['required','string','max:255'],'time'=>['nullable'],'duration_minutes'=>['nullable','integer','min:1'],'linked_habit_id'=>['nullable','uuid'],'linked_task_id'=>['nullable','uuid']]); \App\Models\RoutineItem::create($d); return back()->with('status','Routine item added.'); }
}
