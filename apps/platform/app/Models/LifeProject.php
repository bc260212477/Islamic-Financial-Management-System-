<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class LifeProject extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['name','color','status'];
    
}
