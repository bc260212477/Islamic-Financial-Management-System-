<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\GrowthController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\HoldingController;
use App\Http\Controllers\MarketController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/accounts', [AccountController::class, 'index'])->name('accounts.index');
    Route::post('/accounts', [AccountController::class, 'store'])->name('accounts.store');
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::post('/transactions/transfer', [TransactionController::class, 'transfer'])->name('transactions.transfer');
    Route::delete('/transactions/{t}', [TransactionController::class, 'destroy'])->name('transactions.destroy');
    Route::get('/businesses', [BusinessController::class, 'index'])->name('businesses.index');
    Route::post('/businesses', [BusinessController::class, 'store'])->name('businesses.store');
    Route::delete('/businesses/{b}', [BusinessController::class, 'destroy'])->name('businesses.destroy');
    Route::get('/goals', [GoalController::class, 'index'])->name('goals.index');
    Route::post('/goals', [GoalController::class, 'store'])->name('goals.store');
    Route::delete('/goals/{g}', [GoalController::class, 'destroy'])->name('goals.destroy');
    Route::get('/holdings', [HoldingController::class, 'index'])->name('holdings.index');
    Route::post('/holdings', [HoldingController::class, 'store'])->name('holdings.store');
    Route::post('/holdings/import', [HoldingController::class, 'import'])->name('holdings.import');
    Route::delete('/holdings/{h}', [HoldingController::class, 'destroy'])->name('holdings.destroy');
    Route::get('/calculators', [CalculatorController::class, 'index'])->name('calculators.index');
    Route::get('/market', [MarketController::class, 'index'])->name('market.index');
    Route::post('/market/import', [MarketController::class, 'import'])->name('market.import');
    Route::get('/assistant', [AssistantController::class, 'index'])->name('assistant.index');
    Route::post('/assistant/chat', [AssistantController::class, 'chat'])->name('assistant.chat');
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/family', [FamilyController::class, 'index'])->name('family.index');
    Route::post('/family/members', [FamilyController::class, 'storeMember'])->name('family.members.store');
    Route::post('/family/expenses', [FamilyController::class, 'storeExpense'])->name('family.expenses.store');
    Route::get('/habits', [HabitController::class, 'index'])->name('habits.index');
    Route::post('/habits', [HabitController::class, 'store'])->name('habits.store');
    Route::post('/habits/{h}/toggle', [HabitController::class, 'toggle'])->name('habits.toggle');
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::post('/tasks/{t}/move', [TaskController::class, 'move'])->name('tasks.move');
    Route::post('/routines', [TaskController::class, 'storeRoutine'])->name('routines.store');
    Route::post('/routine-items', [TaskController::class, 'storeRoutineItem'])->name('routine-items.store');
    Route::get('/growth', [GrowthController::class, 'index'])->name('growth.index');
    Route::post('/growth/journal', [GrowthController::class, 'storeJournal'])->name('growth.journal.store');
    Route::post('/growth/reading', [GrowthController::class, 'storeReading'])->name('growth.reading.store');
    Route::post('/growth/skills', [GrowthController::class, 'storeSkill'])->name('growth.skills.store');
    Route::post('/growth/assessments', [GrowthController::class, 'storeAssessment'])->name('growth.assessments.store');
    Route::post('/growth/health', [GrowthController::class, 'storeHealth'])->name('growth.health.store');
    Route::get('/reports/csv', [ReportController::class, 'csv'])->name('reports.csv');
    Route::get('/lang/{locale}', function ($locale) { if (in_array($locale, ['en','ur'])) session(['locale' => $locale]); return back(); })->name('lang.switch');
});

require __DIR__.'/auth.php';
