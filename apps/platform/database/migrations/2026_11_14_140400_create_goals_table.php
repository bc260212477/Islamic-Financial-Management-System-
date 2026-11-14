<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void { Schema::create('goals', function (Blueprint $table) {
            $table->uuid('id')->primary(); $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name'); $table->decimal('target_amount',19,4); $table->decimal('current_amount',19,4)->default(0);
            $table->decimal('monthly_saving',19,4)->default(0); $table->date('target_date')->nullable();
            $table->timestamps(); $table->softDeletes(); }); }
    public function down(): void { Schema::dropIfExists('goals'); }
};
