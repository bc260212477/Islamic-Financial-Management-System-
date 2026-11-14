<?php
namespace App\Models;
use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Transaction extends Model {
    use HasFactory, HasUuids, SoftDeletes, BelongsToTenant;
    protected $fillable = ['account_id','business_id','category_id','direction','type','counterparty','amount','currency','date','note','transfer_pair_id'];
    protected $casts = ['amount'=>'decimal:4','date'=>'date'];
    public function account() { return $this->belongsTo(Account::class); }
    public function business() { return $this->belongsTo(Business::class); }
}
