<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['project_id','parent_task_id','title','description','due_date','priority','status','recurring_rule'];
    protected $casts = ['due_date'=>'date'];
    
}
