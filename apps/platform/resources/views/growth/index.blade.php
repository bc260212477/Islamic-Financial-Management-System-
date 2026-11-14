<x-app-layout><x-slot name="header"><h2 class="font-semibold text-xl">Growth OS & Elite Path</h2></x-slot><div class="py-8"><div class="max-w-6xl mx-auto px-4">@if(session('status'))<p class="mb-4">{{ session('status') }}</p>@endif

<p><strong>Level {{ $elite['level'] }} — {{ $elite['name'] }}</strong> · checkpoints {{ $elite['passed'] }}/{{ $elite['total'] }}</p>
<ul>@foreach($elite['checks'] as $k=>$v)<li>{{ $v?'✓':'○' }} {{ str_replace('_',' ',$k) }}</li>@endforeach</ul>
<form method="POST" action="{{ route('growth.journal.store') }}" class="mt-4">@csrf <input name="date" type="date" value="{{ date('Y-m-d') }}" required> <input name="mood" placeholder="Mood"> <input name="gratitude" placeholder="Gratitude"> <input name="wins" placeholder="Wins"> <button>Save journal</button></form>
<form method="POST" action="{{ route('growth.reading.store') }}">@csrf <input name="book_title" placeholder="Book" required> <input name="pages_read" type="number" placeholder="Pages" required> <input name="date" type="date" value="{{ date('Y-m-d') }}" required> <button>Log reading</button></form>
<form method="POST" action="{{ route('growth.skills.store') }}">@csrf <input name="name" placeholder="Skill" required> <input name="level" type="number" value="1" min="1" max="10"> <button>Add skill</button></form>
<form method="POST" action="{{ route('growth.assessments.store') }}">@csrf <select name="type"><option>big-five</option><option>mbti</option><option>enneagram</option></select> <input name="results" placeholder="Result summary" required> <button>Save assessment</button></form>
<p class="mt-4">Skills: @foreach($skills as $s){{ $s->name }} ({{ $s->level }}/{{ $s->target_level }}) · @endforeach</p>
<p>Reading: @foreach($reading as $r){{ $r->book_title }} {{ $r->pages_read }}p · @endforeach</p>
</div></div></x-app-layout>
