<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndDemoSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['admin', 'member'] as $role) {
            Role::findOrCreate($role, 'web');
        }

        // FICTIONAL demo data — clearly labelled, never real user data.
        $demo = User::firstOrCreate(
            ['email' => 'demo@barakah.local'],
            ['name' => 'Demo User (FICTIONAL)', 'password' => 'password']
        );
        $demo->assignRole('member');

        foreach ([
            ['expense', 'Food', '#C9A227'], ['expense', 'Housing', '#8A7350'], ['expense', 'Sadaqah', '#2F7A5E'],
            ['income', 'Salary', '#2F7A5E'], ['income', 'Business', '#C9A227'],
        ] as [$kind, $name, $color]) {
            Category::firstOrCreate(['user_id' => null, 'kind' => $kind, 'name' => $name], ['color' => $color]);
        }

        Account::withoutGlobalScopes()->firstOrCreate(
            ['user_id' => $demo->id, 'name' => 'Demo Bank (FICTIONAL)'],
            ['kind' => 'bank', 'currency' => 'PKR', 'opening_balance' => 0]
        );
    }
}
