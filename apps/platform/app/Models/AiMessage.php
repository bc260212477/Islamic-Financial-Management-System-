<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class AiMessage extends Model { use HasUuids; protected $fillable=['conversation_id','role','content','citations']; protected $casts=['citations'=>'array']; }
