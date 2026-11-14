<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void { Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary(); $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('account_id')->constrained('accounts')->cascadeOnDelete();
            $table->foreignUuid('business_id')->nullable()->constrained('businesses')->nullOnDelete();
            $table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('direction',3); $table->string('type',30)->default('other');
            $table->string('counterparty'); $table->decimal('amount',19,4); $table->char('currency',3)->default('PKR');
            $table->date('date'); $table->text('note')->nullable(); $table->uuid('transfer_pair_id')->nullable()->index();
            $table->timestamps(); $table->softDeletes(); $table->index(['user_id','date']); }); }
    public function down(): void { Schema::dropIfExists('transactions'); }
};
