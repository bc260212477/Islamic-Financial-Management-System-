<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void { Schema::create('holdings', function (Blueprint $table) {
            $table->uuid('id')->primary(); $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name'); $table->string('kind',20)->default('Equity'); $table->string('sector')->nullable();
            $table->decimal('invested',19,4); $table->decimal('current_value',19,4); $table->decimal('income',19,4)->default(0);
            $table->decimal('debt_ratio',5,2)->nullable(); $table->decimal('inv_ratio',5,2)->nullable();
            $table->string('data_mode',20)->default('Manual'); $table->timestamps(); $table->softDeletes(); }); }
    public function down(): void { Schema::dropIfExists('holdings'); }
};
