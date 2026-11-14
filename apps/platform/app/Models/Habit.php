<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class Habit extends Model {
    use HasUuids;
use App\Models\Concerns\BelongsToTenant;
    use BelongsToTenant;
    protected $fillable = ['name','frequency','target','color','category'];
    protected $casts = ['amount'=>'decimal:4','results_json'=>'array','date'=>'date','completed'=>'boolean','recurring'=>'boolean'];
    public function logs() { return $this->hasMany(HabitLog::class); }
}
