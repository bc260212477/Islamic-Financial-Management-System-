<?php
namespace App\Http\Controllers;
use App\Models\Business; use App\Models\Transaction; use Illuminate\Http\Request;
class BusinessController extends Controller {
    public function index() {
        $businesses = Business::orderBy('name')->get()->map(function ($b) {
            $rev = Transaction::where('business_id',$b->id)->where('direction','in')->where('type','!=','transfer')->sum('amount');
            $exp = Transaction::where('business_id',$b->id)->where('direction','out')->where('type','!=','transfer')->sum('amount');
            $b->pnl = ['revenue'=>(float)$rev,'expenses'=>(float)$exp,'profit'=>(float)($rev-$exp)];
            return $b; });
        return view('businesses.index', compact('businesses'));
    }
    public function store(Request $r) { $d=$r->validate(['name'=>['required','string','max:255'],'branch'=>['nullable','string','max:255'],'kind'=>['nullable','string','max:255']]); Business::create($d); return back()->with('status','Business created.'); }
    public function destroy(Business $b) { $b->delete(); return back()->with('status','Deleted.'); }
}
