<?php
namespace App\Http\Controllers;
use App\Models\MarketInstrument; use App\Models\MarketPrice; use App\Models\MarketSector; use Illuminate\Http\Request;
class MarketController extends Controller {
    public function index(Request $r) {
        $index = $r->input('index','KMI-30');
        $sectors = MarketSector::where('index_code',$index)->with('instruments')->get();
        $sector = $r->input('sector') ? $sectors->firstWhere('id',$r->input('sector')) : null;
        $instruments = $sector ? $sector->instruments : $sectors->flatMap->instruments;
        $rows = $instruments->map(function($i){ $p = MarketPrice::where('instrument_id',$i->id)->orderByDesc('date')->first(); return ['instrument'=>$i,'price'=>$p]; })->filter(fn($x) => $x['price'] !== null);
        $totalCap = $rows->sum(fn($x)=>(float)$x['instrument']->market_cap);
        $adv = $rows->filter(fn($x)=>(float)$x['price']->change_pct>0)->count(); $dec = $rows->filter(fn($x)=>(float)$x['price']->change_pct<0)->count();
        $kpis = [['label'=>'Advancers %','value'=>$rows->count()?round($adv/$rows->count()*100,1):null,'method'=>'advancers / listed in scope (FIN-08)'],
                 ['label'=>'Companies','value'=>$rows->count(),'method'=>'count in selected scope'],
                 ['label'=>'Market cap (scope)','value'=>$totalCap,'method'=>'sum of market_cap in scope']];
        $gainers = $rows->sortByDesc(fn($x)=>(float)$x['price']->change_pct)->take(5); $losers = $rows->sortBy(fn($x)=>(float)$x['price']->change_pct)->take(5);
        $mode = $rows->count() ? $rows->first()['price']->data_mode : 'Demo';
        return view('market.index', compact('index','sectors','sector','rows','kpis','gainers','losers','mode'));
    }
    public function import(Request $r) {
        $r->validate(['csv'=>['required','file','mimes:csv,txt','max:2048']]);
        $rows = array_map('str_getcsv', file($r->file('csv')->getRealPath())); $head = array_map('trim', array_shift($rows)); $n=0;
        foreach ($rows as $row) { if (count($row)!==count($head)) continue; $d=array_combine($head,$row); if (empty($d['symbol'])||empty($d['sector'])) continue;
            $sec = MarketSector::firstOrCreate(['index_code'=>$d['index']??'KMI-30','name'=>$d['sector']]);
            $ins = MarketInstrument::firstOrCreate(['sector_id'=>$sec->id,'symbol'=>$d['symbol']],['name'=>$d['name']??$d['symbol'],'market_cap'=>$d['market_cap']??0]);
            MarketPrice::updateOrCreate(['instrument_id'=>$ins->id,'date'=>$d['date']??now()->toDateString()],['close'=>$d['close']??0,'change_pct'=>$d['change_pct']??0,'volume'=>$d['volume']??0,'data_mode'=>'CSV']); $n++; }
        return back()->with('status',"Imported {$n} market rows (CSV mode — not live).");
    }
}
