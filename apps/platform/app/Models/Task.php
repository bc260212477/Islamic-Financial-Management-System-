<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class Task extends Model {
    use HasUuids;
use App\Models\Concerns\BelongsToTenant;
    use BelongsToTenant;
    protected $fillable = ['project_id','parent_task_id','title','description','due_date','priority','status','recurring_rule'];
    protected $casts = ['amount'=>'decimal:4','results_json'=>'array','date'=>'date','completed'=>'boolean','recurring'=>'boolean'];
    public function noop() { return null; }
}
