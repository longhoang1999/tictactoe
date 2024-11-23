<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class HandleMoveEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $row;
    public $col;
    public $currentPlayer;
    public $gameOver;
    public $userSend;
    public $userReceived;


    public function __construct($row, $col, $currentPlayer, $gameOver, $userSend, $userReceived)
    {
        $this->row = $row;
        $this->col = $col;
        $this->currentPlayer = $currentPlayer;
        $this->gameOver = $gameOver;
        $this->userSend = $userSend;
        $this->userReceived = $userReceived;
    }

    public function broadcastOn()
    {
        return new PresenceChannel('start-game');
    }
}
