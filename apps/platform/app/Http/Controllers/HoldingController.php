<?php
namespace App\Http\Controllers;
use App\Models\Holding; use App\Services\Calculators; use Illuminate\Http\Request;
class HoldingController extends Controller {
    public function index() {
        $holdings = Holding::orderBy('name')->get()->map(function($h){ $h->ret = Calculators::returnPct((float)$h->invested,(float)$h->current_value); $h->screening = ($h->debt_ratio!==null && $h->inv_ratio!==null) ? Calculators::screening((float)$h->debt_ratio,(float)$h->inv_ratio) : null; return $h; });
        $value = $holdings->sum('current_value'); $invested = $holdings->sum('invested');
        return view('holdings.index', compact('holdings','value','invested'));
    }
    public function store(Request $r) { $d=$r->validate(['name'=>['required','string','max:255'],'kind'=>['required','string','max:20'],'sector'=>['nullable','string','max:255'],'invested'=>['required','numeric','min:0'],'current_value'=>['required','numeric','min:0'],'income'=>['nullable','numeric','min:0'],'debt_ratio'=>['nullable','numeric','between:0,100'],'inv_ratio'=>['nullable','numeric','between:0,100']]); $d['data_mode']='Manual'; Holding::create($d); return back()->with('status','Holding added (Manual data).'); }
    public function destroy(Holding $h) { $h->delete(); return back(); }
    public function import(Request $r) {
        $r->validate(['csv'=>['required','file','mimes:csv,txt','max:2048']]);
        $rows = array_map('str_getcsv', file($r->file('csv')->getRealPath())); $head = array_map('trim', array_shift($rows)); $n=0;
        foreach ($rows as $row) { if (count($row)!==count($head)) continue; $d=array_combine($head,$row); if (empty($d['name']) || !is_numeric($d['invested']??null)) continue;
            Holding::create(['name'=>$d['name'],'kind'=>$d['type']??'Fund','sector'=>$d['sector']??null,'invested'=>$d['invested'],'current_value'=>$d['value']??0,'income'=>$d['income']??0,'data_mode'=>'CSV']); $n++; }
        return back()->with('status',"Imported {$n} holdings (CSV mode).");
    }
}
