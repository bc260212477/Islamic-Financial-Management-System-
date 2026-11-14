<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Routine extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['name','days_of_week','type'];
    public function items() { return $this->hasMany(RoutineItem::class); }
}
