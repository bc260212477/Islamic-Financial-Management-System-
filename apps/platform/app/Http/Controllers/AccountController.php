<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::orderBy('name')->get(); // tenant global scope applies

        return view('accounts.index', compact('accounts'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'kind' => ['required', 'in:bank,cash,wallet,broker'],
            'currency' => ['required', 'string', 'size:3'],
            'opening_balance' => ['required', 'numeric', 'between:-999999999999999,999999999999999'],
        ]);
        Account::create($data); // user_id set by model hook

        return redirect()->route('accounts.index')->with('status', 'Account created.');
    }
}
