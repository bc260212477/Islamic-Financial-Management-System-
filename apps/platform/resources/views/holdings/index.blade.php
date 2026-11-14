<x-app-layout><x-slot name="header"><h2 class="font-semibold text-xl">Investments</h2></x-slot><div class="py-8"><div class="max-w-6xl mx-auto px-4">@if(session('status'))<p class="mb-4">{{ session('status') }}</p>@endif

<p>Value {{ number_format($value,2) }} · Invested {{ number_format($invested,2) }} · Data mode: Manual/CSV (never labelled live)</p>
<form method="POST" action="{{ route('holdings.store') }}">@csrf <input name="name" placeholder="Holding" required> <input name="kind" value="Equity"> <input name="sector" placeholder="Sector"> <input name="invested" type="number" step="0.01" placeholder="Invested" required> <input name="current_value" type="number" step="0.01" placeholder="Value" required> <input name="income" type="number" step="0.01" placeholder="Income"> <input name="debt_ratio" type="number" step="0.01" placeholder="Debt %"> <input name="inv_ratio" type="number" step="0.01" placeholder="Inv %"> <button>Add</button></form>
<form method="POST" action="{{ route('holdings.import') }}" enctype="multipart/form-data" class="mt-3">@csrf <input type="file" name="csv" required> <button>Import CSV (name,type,invested,value,income)</button></form>
<table class="mt-4"><tr><th>Holding</th><th>Return</th><th>Screening</th></tr>
@foreach($holdings as $h)<tr><td>{{ $h->name }} ({{ $h->data_mode }})</td><td>{{ $h->ret }}%</td><td>@if($h->screening){{ $h->screening['verdict'] }} · {{ $h->screening['stars'] }}★ (debt {{ $h->debt_ratio }}%, inv {{ $h->inv_ratio }}%)@else — @endif</td></tr>@endforeach</table>
</div></div></x-app-layout>
