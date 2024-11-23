@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h1>Game Cờ Ca Rô {{ Auth::id() }}</h1>
                <div class="board">
                    <!-- Các ô trong bàn cờ sẽ được thêm bằng JavaScript -->
                </div>
                <div class="info">
                    <p id="message">Lượt của người chơi X</p>
                    <button id="reset">Chơi lại</button>
                </div>

            </div>
        </div>
    </div>
@endsection


<script>
    let userSend = "{{ $userSend->id }}"
    let userReceived = "{{ $userReceived->id }}"
    let userSignIn = "{{ Auth::id() }}"
</script>

@vite(['resources/sass/app.scss', 'resources/js/logic-games.js'])
