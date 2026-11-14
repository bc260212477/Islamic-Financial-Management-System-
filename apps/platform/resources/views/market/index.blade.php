<x-app-layout><x-slot name="header"><h2 class="font-semibold text-xl">Market Intelligence</h2></x-slot><div class="py-8"><div class="max-w-6xl mx-auto px-4">@if(session('status'))<p class="mb-4">{{ session('status') }}</p>@endif

<p><strong>Data mode: {{ $mode }}</strong> — manual/CSV/demo data is never labelled live. Index: {{ $index }}</p>
<form method="GET"><select name="index"><option>KMI-30</option><option>KSE-100</option></select>
<select name="sector"><option value="">All sectors</option>@foreach($sectors as $s)<option value="{{ $s->id }}" @selected($sector && $sector->id===$s->id)>{{ $s->name }}</option>@endforeach</select><button>Apply scope</button></form>
<form method="POST" action="{{ route('market.import') }}" enctype="multipart/form-data">@csrf <input type="file" name="csv" required> <button>Import EOD CSV (symbol,sector,close,change_pct,…)</button></form>
<div class="flex gap-4 mt-4">@foreach($kpis as $k)<div><strong>{{ $k['label'] }}</strong><br>{{ $k['value'] ?? 'No data' }}<br><small>{{ $k['method'] }}</small></div>@endforeach</div>
<h3 class="mt-4">{{ $sector? $sector->name : 'All sectors' }}</h3>
<p>Gainers: @foreach($gainers as $g){{ $g['instrument']->symbol }} {{ $g['price']->change_pct }}% · @endforeach</p>
<p>Losers: @foreach($losers as $g){{ $g['instrument']->symbol }} {{ $g['price']->change_pct }}% · @endforeach</p>
<table><tr><th>Symbol</th><th>Close</th><th>%</th><th>Mode</th></tr>@foreach($rows as $r)<tr><td>{{ $r['instrument']->symbol }} — {{ $r['instrument']->name }}</td><td>{{ $r['price']->close }}</td><td>{{ $r['price']->change_pct }}</td><td>{{ $r['price']->data_mode }}</td></tr>@endforeach</table>
</div></div></x-app-layout>
