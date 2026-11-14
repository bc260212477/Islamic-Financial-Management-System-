<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class FamilyExpense extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['family_member_id','account_id','category','amount','date','recurring'];
    protected $casts = ['amount'=>'decimal:4','date'=>'date','recurring'=>'boolean'];
    public function member() { return $this->belongsTo(FamilyMember::class, 'family_member_id'); }
}
