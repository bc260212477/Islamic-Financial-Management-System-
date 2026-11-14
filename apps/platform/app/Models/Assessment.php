<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['type','results_json','taken_at'];
    protected $casts = ['results_json'=>'array','taken_at'=>'datetime'];
    
}
