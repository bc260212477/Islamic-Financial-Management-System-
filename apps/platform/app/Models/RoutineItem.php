<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class RoutineItem extends Model
{
    use HasUuids;
    protected $fillable = ['routine_id','title','time','duration_minutes','linked_habit_id','linked_task_id'];
    
}
