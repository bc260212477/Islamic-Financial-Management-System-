<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class Assessment extends Model {
    use HasUuids;
use App\Models\Concerns\BelongsToTenant;
    use BelongsToTenant;
    protected $fillable = ['type','results_json','taken_at'];
    protected $casts = ['amount'=>'decimal:4','results_json'=>'array','date'=>'date','completed'=>'boolean','recurring'=>'boolean'];
    public function noop() { return null; }
}
