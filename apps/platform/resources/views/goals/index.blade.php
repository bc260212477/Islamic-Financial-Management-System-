<x-app-layout><x-slot name="header"><h2 class="font-semibold text-xl">Savings & Goals</h2></x-slot><div class="py-8"><div class="max-w-6xl mx-auto px-4">@if(session('status'))<p class="mb-4">{{ session('status') }}</p>@endif

<form method="POST" action="{{ route('goals.store') }}">@csrf <input name="name" placeholder="Goal" required> <input name="target_amount" type="number" step="0.01" placeholder="Target" required> <input name="current_amount" type="number" step="0.01" placeholder="Saved"> <input name="monthly_saving" type="number" step="0.01" placeholder="Per month"> <button>Add goal</button></form>
@foreach($goals as $g)<p class="mt-3"><strong>{{ $g->name }}</strong> — {{ $g->progress }}% · {{ number_format((float)$g->current_amount,2) }} / {{ number_format((float)$g->target_amount,2) }} @if($g->months!==PHP_INT_MAX)· ~{{ $g->months }} months at current saving (FIN-14)@endif</p>@endforeach
</div></div></x-app-layout>
