<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class JournalEntry extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['date','mood','gratitude','reflection','wins','lessons'];
    protected $casts = ['date'=>'date'];
    
}
