<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void { Schema::create('businesses', function (Blueprint $table) {
            $table->uuid('id')->primary(); $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name'); $table->string('branch')->nullable(); $table->string('kind')->nullable();
            $table->timestamps(); $table->softDeletes(); $table->index('user_id'); }); }
    public function down(): void { Schema::dropIfExists('businesses'); }
};
