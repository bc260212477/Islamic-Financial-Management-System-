<?php
namespace App\Models;
use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Business extends Model {
    use HasFactory, HasUuids, SoftDeletes, BelongsToTenant;
    protected $fillable = ['name','branch','kind'];
    protected $casts = [];
    public function transactions() { return $this->hasMany(Transaction::class); }
}
