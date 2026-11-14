<?php
namespace App\Http\Controllers;
use App\Models\Account; use App\Models\FamilyExpense; use App\Models\FamilyMember; use App\Models\Transaction; use Illuminate\Http\Request;
class FamilyController extends Controller {
    public function index() { $members = FamilyMember::with('expenses')->orderBy('name')->get(); $expenses = FamilyExpense::with('member')->orderByDesc('date')->limit(50)->get(); $accounts = Account::orderBy('name')->get(); return view('family.index', compact('members','expenses','accounts')); }
    public function storeMember(Request $r) { $d=$r->validate(['name'=>['required','string','max:255'],'relation'=>['required','string','max:30'],'monthly_allowance'=>['nullable','numeric','min:0'],'school_fee'=>['nullable','numeric','min:0'],'notes'=>['nullable','string']]); FamilyMember::create($d); return back()->with('status','Family member added.'); }
    public function storeExpense(Request $r) {
        $d=$r->validate(['family_member_id'=>['required','uuid'],'account_id'=>['nullable','uuid'],'category'=>['nullable','string','max:50'],'amount'=>['required','numeric','gt:0'],'date'=>['required','date'],'recurring'=>['nullable','boolean']]);
        $e = FamilyExpense::create($d);
        if (!empty($d['account_id'])) { $m = FamilyMember::find($d['family_member_id']); Transaction::create(['account_id'=>$d['account_id'],'family_member_id'=>$d['family_member_id'],'direction'=>'out','type'=>'family','counterparty'=>'Family: '.($m? $m->name:''),'amount'=>$d['amount'],'currency'=>'PKR','date'=>$d['date']]); }
        return back()->with('status','Family expense saved and linked to cash flow.');
    }
}
