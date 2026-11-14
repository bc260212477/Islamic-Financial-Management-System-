<x-app-layout>
    <x-slot name="header"><h2 class="font-semibold text-xl">Accounts</h2></x-slot>
    <div class="py-8"><div class="max-w-5xl mx-auto px-4">
        @if (session('status'))<p class="mb-4">{{ session('status') }}</p>@endif
        <ul>
            @forelse ($accounts as $account)
                <li>{{ $account->name }} · {{ $account->currency }} {{ number_format((float) $account->opening_balance, 2) }}</li>
            @empty
                <li>No accounts yet.</li>
            @endforelse
        </ul>
        <form method="POST" action="{{ route('accounts.store') }}" class="mt-6">
            @csrf
            <input name="name" placeholder="Account name" required>
            <select name="kind"><option>bank</option><option>cash</option><option>wallet</option><option>broker</option></select>
            <input name="currency" value="PKR" size="3" required>
            <input name="opening_balance" type="number" step="0.01" value="0" required>
            <button type="submit">Add account</button>
        </form>
    </div></div>
</x-app-layout>
