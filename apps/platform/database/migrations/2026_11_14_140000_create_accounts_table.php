<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('kind', 20)->default('bank'); // bank|cash|wallet|broker
            $table->char('currency', 3)->default('PKR');
            $table->decimal('opening_balance', 19, 4)->default(0);
            $table->date('opened_on')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['user_id', 'kind']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
