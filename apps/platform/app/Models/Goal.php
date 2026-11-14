<?php
namespace App\Models;
use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Goal extends Model {
    use HasFactory, HasUuids, SoftDeletes, BelongsToTenant;
    protected $fillable = ['name','target_amount','current_amount','monthly_saving','target_date'];
    protected $casts = ['target_amount'=>'decimal:4','current_amount'=>'decimal:4','monthly_saving'=>'decimal:4','target_date'=>'date'];

}
