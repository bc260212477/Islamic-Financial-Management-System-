<x-app-layout>
    <x-slot name="header"><h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ __('Dashboard') }}</h2></x-slot>
    <div class="py-8"><div class="max-w-6xl mx-auto px-4">
        <p>Net worth (accounts + holdings, FIN-01): <strong>{{ number_format($netWorth, 2) }}</strong></p>
        <p>Income {{ number_format($income, 2) }} · Expenses {{ number_format($expenses, 2) }} · Net cash {{ number_format($income - $expenses, 2) }} · Savings rate {{ $savingsRate }}%</p>
        <p>Financial health (FIN-19): <strong>{{ $health ?? 'Insufficient data' }}</strong>
            @foreach ($indicators as $k => $i) · {{ $k }} {{ $i['score'] }}/{{ $i['max'] }} @endforeach</p>
        <nav class="mt-4">
            <a href="{{ route('transactions.index') }}">Transactions</a> ·
            <a href="{{ route('businesses.index') }}">Businesses</a> ·
            <a href="{{ route('goals.index') }}">Goals</a> ·
            <a href="{{ route('holdings.index') }}">Investments</a> ·
            <a href="{{ route('market.index') }}">Markets</a> ·
            <a href="{{ route('calculators.index') }}">Calculators / Zakat</a> ·
            <a href="{{ route('assistant.index') }}">AI Assistant</a> ·
            <a href="{{ route('reports.index') }}">Reports</a>
        </nav>
    </div></div>
</x-app-layout>
