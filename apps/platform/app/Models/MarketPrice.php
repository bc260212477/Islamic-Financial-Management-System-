<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class MarketPrice extends Model {
    use HasUuids;
    protected $fillable = ['instrument_id','date','close','change_pct','volume','data_mode'];
    public function sector() { return $this->belongsTo(MarketSector::class, 'sector_id'); }
    public function prices() { return $this->hasMany(MarketPrice::class, 'instrument_id'); }
    public function instruments() { return $this->hasMany(MarketInstrument::class, 'sector_id'); }
}
