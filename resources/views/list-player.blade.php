@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h1>Danh sách người chơi</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($listPlayer as $key => $value)
                            <tr>
                                <td>{{ $key + 1 }}</td>
                                <td>{{ $value->name }}</td>
                                <td id='status-user-{{ $value->id }}' class="text-danger">
                                    Offline
                                </td>
                                <td>{{ $value->email }}</td>
                                <td id="button-user-{{ $value->id }}">

                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection


<script>
    let userSignIn = "{{ Auth::id() }}"
</script>

@vite(['resources/js/games.js'])
