<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class GameEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userSend;
    public $userReceived;
    public $acceptFight;

    public function __construct(User $userSend, User $userReceived, $acceptFight = false)
    {
        $this->userSend = $userSend;
        $this->userReceived = $userReceived;
        $this->acceptFight = $acceptFight;
    }

    public function broadcastOn()
    {
        return  new PresenceChannel('games');
    }
}
