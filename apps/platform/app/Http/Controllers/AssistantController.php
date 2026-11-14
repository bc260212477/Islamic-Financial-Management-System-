<?php
namespace App\Http\Controllers;
use App\Models\AiConversation; use App\Models\Holding; use App\Models\Transaction; use App\Services\Calculators; use Illuminate\Http\Request;
class AssistantController extends Controller {
    public function index() { $c = AiConversation::where('user_id',auth()->id())->latest()->first(); return view('assistant.index',['messages'=>$c? $c->messages()->get():collect()]); }
    public function chat(Request $r) {
        $q = strtolower($r->validate(['question'=>['required','string','max:1000']])['question']);
        $income = (float) Transaction::where('direction','in')->where('type','!=','transfer')->sum('amount');
        $expenses = (float) Transaction::where('direction','out')->where('type','!=','transfer')->sum('amount');
        $habitDone = \App\Models\HabitLog::where('date', today()->toDateString())->where('completed', true)->count();
        $habitTotal = \App\Models\Habit::count();
        $openTasks = \App\Models\Task::where('status','!=','done')->count();
        $overdue = \App\Models\Task::where('status','!=','done')->whereDate('due_date','<',today())->count();
        $familySpend = (float) \App\Models\FamilyExpense::sum('amount');
        $citations = ['transactions aggregate (income='.number_format($income,2).', expenses='.number_format($expenses,2).')', "habits today {$habitDone}/{$habitTotal}", "tasks open {$openTasks}, overdue {$overdue}", 'family expenses '.number_format($familySpend,2)];
        if (str_contains($q,'zakat')) { $z=Calculators::zakat(18500,4200,0,2100,78); $a="Using the default example values, net wealth is ".number_format($z['net'],2).", nisab ".number_format($z['nisab'],2).", zakat ".number_format($z['zakat'],2)." (FIN-11). Update your real values in Calculators."; $citations[]='Calculators::zakat FIN-11 example inputs'; }
        elseif (str_contains($q,'portfolio')||str_contains($q,'investment')) { $v=(float)Holding::sum('current_value'); $i=(float)Holding::sum('invested'); $a="Your holdings are worth ".number_format($v,2)." on ".number_format($i,2)." invested — return ".Calculators::returnPct($i,$v)."% (FIN-05). Data mode: Manual/CSV as labelled per holding."; $citations[]='holdings aggregate'; }
        elseif (str_contains($q,'trade')||str_contains($q,'buy ')||str_contains($q,'sell ')||str_contains($q,'fatwa')) { $a="I can't give trading instructions or religious rulings. I can explain your own data, screenings and calculations — please consult a licensed adviser or qualified scholar for decisions."; }
        elseif (str_contains($q,'fix')||str_contains($q,'next')||str_contains($q,'today')) { $a="Today: habits {$habitDone}/{$habitTotal} done, {$openTasks} open tasks ({$overdue} overdue), family spend ".number_format($familySpend,2).", net cash flow ".number_format(Calculators::cashFlow($income,$expenses),2).". Fix the overdue tasks and today's habits first, then review spending."; }
        elseif (str_contains($q,'habit')) { $a="Habits today: {$habitDone} of {$habitTotal} completed. Consistency feeds your Discipline/Elite Path checkpoints (see Growth)."; }
        elseif (str_contains($q,'task')) { $a="You have {$openTasks} open tasks, {$overdue} overdue. Overdue items also appear in Tasks in red."; }
        elseif (str_contains($q,'spend')||str_contains($q,'expense')) { $a="You spent ".number_format($expenses,2)." against ".number_format($income,2)." income; net cash flow is ".number_format(Calculators::cashFlow($income,$expenses),2)." (FIN-03)."; }
        elseif ($income==0 && $expenses==0) { $a="I don't have that data yet — add transactions first, then ask again."; }
        else { $a="Your net cash flow is ".number_format(Calculators::cashFlow($income,$expenses),2)." (income ".number_format($income,2)." − expenses ".number_format($expenses,2).", FIN-03). Ask me about spending, zakat, or your portfolio."; }
        $c = AiConversation::firstOrCreate(['user_id'=>auth()->id()]);
        $c->messages()->create(['role'=>'user','content'=>$r->question]);
        $c->messages()->create(['role'=>'assistant','content'=>$a,'citations'=>$citations]);
        return back();
    }
}
