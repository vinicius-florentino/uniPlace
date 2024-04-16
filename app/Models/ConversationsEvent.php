<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversationsEvent extends Model
{
    use HasFactory;

    protected $fillable = ['conversation_id', 'sender_id', 'recipient_id', 'message'];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
