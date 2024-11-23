<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\GameEvent;
use App\Events\HandleMoveEvent;


use App\Models\User;



class GameController extends Controller
{
    public function listPlayer()
    {
        $listPlayer = User::where('id', '<>', Auth::id())->get();
        return view('list-player')->with([
            'listPlayer' => $listPlayer
        ]);
    }

    public function sendFight(Request $req)
    {
        broadcast(new GameEvent(Auth::user(), User::find($req->receivedId)))->toOthers();
        return response()->json([
            'message'   => 'Gửi thách đấu thành công'
        ]);
    }

    public function sendFightAccept(Request $req)
    {
        broadcast(new GameEvent(User::find($req->userSendId), Auth::user(), true))->toOthers();
        return response()->json([
            'message'   => 'Gửi lời chấp nhận thành công'
        ]);
    }


    public function startGame($userSendId, $userReceivedId)
    {
        return view('game')->with([
            'userSend' => User::find($userSendId),
            'userReceived' => User::find($userReceivedId)
        ]);
    }


    public function move(Request $req)
    {
        $row = $req->row;
        $col = $req->col;
        $currentPlayer = $req->currentPlayer;
        $gameOver = $req->gameOver;
        $userSend = User::find($req->userSendId);
        $userReceived = User::find($req->userReceivedId);

        broadcast(new HandleMoveEvent($row, $col, $currentPlayer, $gameOver, $userSend, $userReceived))->toOthers();


        return response()->json([
            'message'   => 'Nước đi thành công'
        ]);
    }
}
