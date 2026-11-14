<?php
namespace App\Models;
use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Holding extends Model {
    use HasFactory, HasUuids, SoftDeletes, BelongsToTenant;
    protected $fillable = ['name','kind','sector','invested','current_value','income','debt_ratio','inv_ratio','data_mode'];
    protected $casts = ['invested'=>'decimal:4','current_value'=>'decimal:4','income'=>'decimal:4'];

}
