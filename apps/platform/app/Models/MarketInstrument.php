<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class MarketInstrument extends Model {
    use HasUuids;
    protected $fillable = ['sector_id','symbol','name','market_cap'];
    public function sector() { return $this->belongsTo(MarketSector::class, 'sector_id'); }
    public function prices() { return $this->hasMany(MarketPrice::class, 'instrument_id'); }
    public function instruments() { return $this->hasMany(MarketInstrument::class, 'sector_id'); }
}
