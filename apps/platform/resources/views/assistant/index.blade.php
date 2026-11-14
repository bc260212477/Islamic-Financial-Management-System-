<x-app-layout><x-slot name="header"><h2 class="font-semibold text-xl">Financial AI Assistant</h2></x-slot><div class="py-8"><div class="max-w-6xl mx-auto px-4">@if(session('status'))<p class="mb-4">{{ session('status') }}</p>@endif

<p>Answers only from your data with citations. No trades, no fatwa, no invented numbers.</p>
@foreach($messages as $m)<p><strong>{{ $m->role }}:</strong> {{ $m->content }} @if($m->citations)<small>[{{ implode('; ',$m->citations) }}]</small>@endif</p>@endforeach
<form method="POST" action="{{ route('assistant.chat') }}">@csrf <input name="question" placeholder="Ask about spending, zakat, portfolio…" style="width:70%" required> <button>Ask</button></form>
</div></div></x-app-layout>
