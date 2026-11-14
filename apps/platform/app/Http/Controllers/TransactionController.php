<?php
namespace App\Http\Controllers;
use App\Models\Account; use App\Models\Business; use App\Models\Category; use App\Models\Transaction;
use Illuminate\Http\Request; use Illuminate\Support\Str;
class TransactionController extends Controller {
    public function index(Request $r) {
        $q = Transaction::with(['account','business'])->orderByDesc('date');
        if ($r->business_id) $q->where('business_id', $r->business_id);
        if ($r->personal) $q->whereNull('business_id');
        $transactions = $q->limit(100)->get();
        $income = Transaction::where('direction','in')->where('type','!=','transfer')->sum('amount');
        $expenses = Transaction::where('direction','out')->where('type','!=','transfer')->sum('amount');
        return view('transactions.index', compact('transactions','income','expenses') + ['accounts'=>Account::orderBy('name')->get(),'businesses'=>Business::orderBy('name')->get(),'categories'=>Category::orderBy('name')->get()]);
    }
    public function store(Request $r) {
        $d = $r->validate(['account_id'=>['required','uuid'],'business_id'=>['nullable','uuid'],'category_id'=>['nullable','uuid'],'direction'=>['required','in:in,out'],'type'=>['required','string','max:30'],'counterparty'=>['required','string','max:255'],'amount'=>['required','numeric','gt:0'],'date'=>['required','date'],'note'=>['nullable','string']]);
        $d['currency'] = 'PKR';
        Transaction::create($d);
        return back()->with('status','Transaction saved.');
    }
    public function transfer(Request $r) {
        $d = $r->validate(['from_account_id'=>['required','uuid','different:to_account_id'],'to_account_id'=>['required','uuid'],'amount'=>['required','numeric','gt:0'],'date'=>['required','date']]);
        $pair = (string) Str::uuid();
        $common = ['type'=>'transfer','counterparty'=>'Own account transfer','currency'=>'PKR','date'=>$d['date'],'transfer_pair_id'=>$pair];
        Transaction::create($common + ['account_id'=>$d['from_account_id'],'direction'=>'out','amount'=>$d['amount']]);
        Transaction::create($common + ['account_id'=>$d['to_account_id'],'direction'=>'in','amount'=>$d['amount']]);
        return back()->with('status','Transfer recorded (excluded from income/expenses, FIN-21).');
    }
    public function destroy(Transaction $t) { $t->delete(); return back()->with('status','Deleted.'); }
}
