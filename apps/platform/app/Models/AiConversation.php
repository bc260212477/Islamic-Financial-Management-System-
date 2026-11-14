<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class AiConversation extends Model { use HasUuids; protected $fillable=['user_id']; public function messages(){ return $this->hasMany(AiMessage::class,'conversation_id'); } }
