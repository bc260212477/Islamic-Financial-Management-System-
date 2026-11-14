<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void { 
        Schema::create('journal_entries', function (Blueprint $t) { $t->uuid('id')->primary(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->date('date'); $t->string('mood',30)->nullable(); $t->text('gratitude')->nullable(); $t->text('reflection')->nullable(); $t->text('wins')->nullable(); $t->text('lessons')->nullable(); $t->timestamps(); });
        Schema::create('reading_logs', function (Blueprint $t) { $t->uuid('id')->primary(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->string('book_title'); $t->unsignedInteger('pages_read')->default(0); $t->date('date'); $t->text('notes')->nullable(); $t->timestamps(); });
        Schema::create('skills', function (Blueprint $t) { $t->uuid('id')->primary(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->string('name'); $t->unsignedTinyInteger('level')->default(1); $t->unsignedTinyInteger('target_level')->default(5); $t->text('evidence')->nullable(); $t->timestamps(); });
        Schema::create('assessments', function (Blueprint $t) { $t->uuid('id')->primary(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->string('type',30); $t->json('results_json'); $t->timestamp('taken_at')->nullable(); $t->timestamps(); });
        Schema::create('health_logs', function (Blueprint $t) { $t->uuid('id')->primary(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->date('date'); $t->decimal('sleep_hours',4,1)->nullable(); $t->unsignedInteger('steps')->nullable(); $t->decimal('weight',5,2)->nullable(); $t->unsignedInteger('water_ml')->nullable(); $t->string('mood',30)->nullable(); $t->timestamps(); });
 }
    public function down(): void { Schema::dropIfExists('health_logs'); Schema::dropIfExists('assessments'); Schema::dropIfExists('skills'); Schema::dropIfExists('reading_logs'); Schema::dropIfExists('journal_entries'); }
};
