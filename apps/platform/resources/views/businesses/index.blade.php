<x-app-layout><x-slot name="header"><h2 class="font-semibold text-xl">Businesses</h2></x-slot><div class="py-8"><div class="max-w-6xl mx-auto px-4">@if(session('status'))<p class="mb-4">{{ session('status') }}</p>@endif

<form method="POST" action="{{ route('businesses.store') }}">@csrf <input name="name" placeholder="Business name" required> <input name="branch" placeholder="Branch"> <input name="kind" placeholder="Kind"> <button>Add business</button></form>
@foreach($businesses as $b)<div class="mt-4"><strong>{{ $b->name }}</strong> {{ $b->branch }} — Revenue {{ number_format($b->pnl['revenue'],2) }} · Expenses {{ number_format($b->pnl['expenses'],2) }} · <strong>P&amp;L {{ number_format($b->pnl['profit'],2) }}</strong></div>@endforeach
</div></div></x-app-layout>
