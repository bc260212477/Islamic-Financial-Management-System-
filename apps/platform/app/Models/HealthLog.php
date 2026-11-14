<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class HealthLog extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['date','sleep_hours','steps','weight','water_ml','mood'];
    protected $casts = ['date'=>'date'];
    
}
