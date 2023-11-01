@extends('layouts.admin-app')

@section('content')
    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Feedback Items</h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-10">
                <table class="table table-striped table-hover table-bordered table-sm text-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">TITLE</th>
                            <th scope="col">CATEGORY</th>
                            <th scope="col">VOTES</th>
                            <th scope="col">AUTHOR</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($feedbacks as $index => $feedback)
                            <tr>
                                <th scope="row">{{ $index + 1 }}</th>
                                <td>{{ $feedback->title }}</td>
                                <td>{{ $feedback->category }}</td>
                                <td>{{ $feedback->votes_count }}</td>
                                <td>{{ $feedback->user->name }}</td>
                                <td>
                                    <form method="POST" action="{{ route('admin.feedback.delete', ['id' => $feedback->id]) }}">
                                        @csrf
                                        @method('POST')
                                        <button type="submit" class="btn btn-sm btn-secondary">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="d-flex justify-content-center">
                    {!! $feedbacks->links('pagination::bootstrap-4') !!}
                </div>
            </div>
        </div>
    </div>
@endsection
