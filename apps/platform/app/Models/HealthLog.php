<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class HealthLog extends Model {
    use HasUuids;
use App\Models\Concerns\BelongsToTenant;
    use BelongsToTenant;
    protected $fillable = ['date','sleep_hours','steps','weight','water_ml','mood'];
    protected $casts = ['amount'=>'decimal:4','results_json'=>'array','date'=>'date','completed'=>'boolean','recurring'=>'boolean'];
    public function noop() { return null; }
}
