<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void { Schema::create('market_sectors', function (Blueprint $table) { $table->uuid('id')->primary(); $table->string('index_code',20); $table->string('name'); $table->timestamps(); $table->unique(['index_code','name']); });
        Schema::create('market_instruments', function (Blueprint $table) { $table->uuid('id')->primary(); $table->foreignUuid('sector_id')->constrained('market_sectors')->cascadeOnDelete(); $table->string('symbol'); $table->string('name'); $table->decimal('market_cap',19,4)->default(0); $table->timestamps(); });
        Schema::create('market_prices', function (Blueprint $table) { $table->uuid('id')->primary(); $table->foreignUuid('instrument_id')->constrained('market_instruments')->cascadeOnDelete(); $table->date('date'); $table->decimal('close',19,4); $table->decimal('change_pct',7,4); $table->decimal('volume',19,2)->default(0); $table->string('data_mode',20)->default('Demo'); $table->timestamps(); $table->unique(['instrument_id','date']); }); }
    public function down(): void { Schema::dropIfExists('market_prices'); Schema::dropIfExists('market_instruments'); Schema::dropIfExists('market_sectors'); }
};
