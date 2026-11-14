<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ReadingLog extends Model
{
    use HasUuids, BelongsToTenant;
    protected $fillable = ['book_title','pages_read','date','notes'];
    protected $casts = ['date'=>'date'];
    
}
