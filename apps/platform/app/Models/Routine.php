<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class Routine extends Model {
    use HasUuids;
use App\Models\Concerns\BelongsToTenant;
    use BelongsToTenant;
    protected $fillable = ['name','days_of_week','type'];
    protected $casts = ['amount'=>'decimal:4','results_json'=>'array','date'=>'date','completed'=>'boolean','recurring'=>'boolean'];
    public function items() { return $this->hasMany(RoutineItem::class); }
}
