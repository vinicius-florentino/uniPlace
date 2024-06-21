<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use App\Models\Conversation;
use App\Models\ConversationsEvent;
use App\Models\Seller;
use App\Models\Ad;
use App\Events\ChatMessage;

class ConversationsController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $userId = $user->id;
        $sellerId = $user->seller?->id;

        $conversationsWithUsers = Conversation::where('seller_id', $sellerId)->with('user')->get();
        $conversationsWithSellers = Conversation::where('user_id', $userId)->with('seller')->get();

        return Inertia::render('Conversations/Conversations', [
            'conversationsWithUsers' => $conversationsWithUsers,
            'conversationsWithSellers' => $conversationsWithSellers
        ]);
    }

    public function show(Request $request, $id): Response
    {
        $user = $request->user();
        $userId = $user->id;
        $sellerId = $user->seller?->id;

        $conversation = Conversation::findOrFail($id)->with(['seller', 'user'])->where(function ($query) use ($userId, $sellerId) {
            $query->where('user_id', $userId)
                ->orWhere('seller_id', $sellerId);
        })
            ->first();

        $conversationEvents = ConversationsEvent::where('conversation_id', $id)
            ->where(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                    ->orWhere('recipient_id', $userId);
            })
            ->get();

        $conversationsWithUsers = Conversation::where('seller_id', $sellerId)->with('user')->get();
        $conversationsWithSellers = Conversation::where('user_id', $userId)->with('seller')->get();

        return Inertia::render('Conversations/Conversations', [
            'conversation' => $conversation,
            'conversationEvents' => $conversationEvents,
            'conversationsWithUsers' => $conversationsWithUsers,
            'conversationsWithSellers' => $conversationsWithSellers,
        ]);
    }

    public function store(Request $request): void
    {
        $user = $request->user();
        $userId = $user->id;
        $sellerId = $user->seller?->id;

        $message = $request->message;
        $conversationId = $request->conversation_id;

        $conversation = Conversation::find($conversationId)->where(function ($query) use ($userId, $sellerId) {
            $query->where('user_id', $userId)
                ->orWhere('seller_id', $sellerId);
        })
            ->first();

        if ($userId == $conversation->user_id) {
            $recipientId = $conversation->seller->user->id;
        } else {
            $recipientId = $conversation->user_id;
        }

        $conversationEvent = ConversationsEvent::create([
            'message' => $message,
            'sender_id' => $userId,
            'recipient_id' => $recipientId,
            'conversation_id' => $conversationId,
        ]);

        broadcast(new ChatMessage($conversationEvent));
    }

    public function startConversation(Request $request): RedirectResponse
    {
        $user = $request->user();
        $userId = $user->id;

        $id = $request->id;
        $adId = $request->ad_id;

        if ($id == $user->seller?->id) {
            return back();
        }

        $seller = Seller::findOrFail($id);
        $sellerId = $seller->id;
        $sellerUserId = $seller->user->id;

        $conversation = Conversation::firstOrCreate(
            ['seller_id' => $sellerId, 'user_id' => $userId]
        );

        $conversationId = $conversation->id;

        if ($adId) {

            $ad = Ad::where('seller_id', $sellerId)->where('id', $adId)->firstOrFail();
            $adTitle = $ad->title;

            $conversationEvent = ConversationsEvent::create([
                'message' => "Olá, iniciei uma conversa sobre o anúncio: " . $adTitle,
                'sender_id' => $userId,
                'recipient_id' => $sellerUserId,
                'conversation_id' => $conversationId,
            ]);

            broadcast(new ChatMessage($conversationEvent));
        }

        return Redirect::to('/conversations' . '/' . $conversationId);
    }
}
