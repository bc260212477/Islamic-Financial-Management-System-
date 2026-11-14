<x-app-layout><x-slot name="header"><h2 class="font-semibold text-xl">Transactions</h2></x-slot><div class="py-8"><div class="max-w-6xl mx-auto px-4">@if(session('status'))<p class="mb-4">{{ session('status') }}</p>@endif

<p>Income: {{ number_format($income,2) }} · Expenses: {{ number_format($expenses,2) }} · Net: {{ number_format($income-$expenses,2) }} (transfers excluded)</p>
<form method="POST" action="{{ route('transactions.store') }}">@csrf
<select name="account_id">@foreach($accounts as $a)<option value="{{ $a->id }}">{{ $a->name }}</option>@endforeach</select>
<select name="business_id"><option value="">Personal</option>@foreach($businesses as $b)<option value="{{ $b->id }}">{{ $b->name }}</option>@endforeach</select>
<select name="category_id"><option value="">—</option>@foreach($categories as $c)<option value="{{ $c->id }}">{{ $c->name }}</option>@endforeach</select>
<select name="direction"><option value="out">Out</option><option value="in">In</option></select>
<input name="type" value="other"><input name="counterparty" placeholder="Merchant/source" required>
<input name="amount" type="number" step="0.01" required><input name="date" type="date" value="{{ date('Y-m-d') }}" required>
<button>Add</button></form>
<form method="POST" action="{{ route('transactions.transfer') }}" class="mt-4">@csrf
<strong>Transfer (own accounts)</strong>
<select name="from_account_id">@foreach($accounts as $a)<option value="{{ $a->id }}">{{ $a->name }}</option>@endforeach</select> →
<select name="to_account_id">@foreach($accounts as $a)<option value="{{ $a->id }}">{{ $a->name }}</option>@endforeach</select>
<input name="amount" type="number" step="0.01" required><input name="date" type="date" value="{{ date('Y-m-d') }}" required><button>Transfer</button></form>
<ul class="mt-6">@foreach($transactions as $t)<li>{{ $t->date->format('d M') }} · {{ $t->counterparty }} · {{ $t->business? $t->business->name : 'Personal' }} · {{ $t->direction==='in'?'+':'−' }}{{ number_format((float)$t->amount,2) }}
<form method="POST" action="{{ route('transactions.destroy',$t) }}" style="display:inline">@csrf @method('DELETE')<button>×</button></form></li>@endforeach</ul>
</div></div></x-app-layout>
