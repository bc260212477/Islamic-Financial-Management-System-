<x-app-layout><x-slot name="header"><h2 class="font-semibold text-xl">Reports</h2></x-slot><div class="py-8"><div class="max-w-6xl mx-auto px-4">@if(session('status'))<p class="mb-4">{{ session('status') }}</p>@endif

<p>Income {{ number_format($s['income'],2) }} · Expenses {{ number_format($s['expenses'],2) }} · Net {{ number_format($s['income']-$s['expenses'],2) }} · Portfolio {{ number_format($s['portfolio'],2) }} · Businesses {{ $s['businesses'] }} · Transactions {{ $s['transactions'] }}</p>
<p><a href="{{ route('reports.csv') }}">Download CSV report</a> · <button onclick="window.print()">Print / save as PDF</button></p>
</div></div></x-app-layout>
