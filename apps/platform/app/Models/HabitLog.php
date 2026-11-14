<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class HabitLog extends Model {
    use HasUuids;
    protected $fillable = ['habit_id','date','completed','note'];
    protected $casts = ['amount'=>'decimal:4','results_json'=>'array','date'=>'date','completed'=>'boolean','recurring'=>'boolean'];
    public function noop() { return null; }
}
