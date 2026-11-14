<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['name','relation','dob','monthly_allowance','school_fee','notes'];
    protected $casts = ['dob'=>'date','monthly_allowance'=>'decimal:4','school_fee'=>'decimal:4'];
    public function expenses() { return $this->hasMany(FamilyExpense::class); }
}
