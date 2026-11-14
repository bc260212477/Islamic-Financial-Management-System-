<x-app-layout><x-slot name="header"><h2 class="font-semibold text-xl">Habit OS</h2></x-slot><div class="py-8"><div class="max-w-6xl mx-auto px-4">@if(session('status'))<p class="mb-4">{{ session('status') }}</p>@endif

<form method="POST" action="{{ route('habits.store') }}">@csrf <input name="name" placeholder="Habit (e.g. Fajr, Quran 10 pages, Gym)" required> <input name="category" placeholder="Category"> <button>Add habit</button></form>
@foreach($habits as $h)<div class="mt-3"><strong>{{ $h->name }}</strong> · streak {{ $h->streak }}d · 30d {{ $h->pct30 }}% <span>@for($i=29;$i>=0;$i--){{ $h->logs->contains(fn($l)=>\Illuminate\Support\Carbon::parse($l->date)->toDateString()===today()->subDays($i)->toDateString() && $l->completed) ? '■' : '□' }}@endfor</span>
<form method="POST" action="{{ route('habits.toggle',$h) }}" style="display:inline">@csrf <button>{{ $h->doneToday?'Undo today':'Done today' }}</button></form></div>@endforeach
</div></div></x-app-layout>
