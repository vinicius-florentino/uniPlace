<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Models\ConversationsEvent;

class ChatMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public ConversationsEvent $conversationEvent;

    public function __construct($conversationEvent)
    {
        $this->conversationEvent = $conversationEvent;
    }

    public function broadcastAs()
    {
        return 'chat-message';
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chat.'.$this->conversationEvent->conversation_id),
        ];
    }
}
