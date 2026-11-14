<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class HabitLog extends Model
{
    use HasUuids;
    protected $fillable = ['habit_id','date','completed','note'];
    protected $casts = ['date'=>'date','completed'=>'boolean'];
    public function habit() { return $this->belongsTo(Habit::class); }
}
