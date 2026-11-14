<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['name','frequency','target','color','category'];
    public function logs() { return $this->hasMany(HabitLog::class); }
}
