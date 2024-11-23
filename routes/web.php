<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\GameController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');



Route::group([
    'middleware' => 'auth'
], function () {
    Route::get('list-player', [GameController::class, 'listPlayer'])->name('listPlayer');
    Route::post('send-fight', [GameController::class, 'sendFight'])->name('sendFight');
    Route::post('send-fight-accept', [GameController::class, 'sendFightAccept'])->name('sendFightAccept');


    Route::get('start-game/{userSendId}/{userReceivedId}', [GameController::class, 'startGame'])->name('startGame');

    Route::post('move', [GameController::class, 'move'])->name('move');
});
