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
                            <th scope="col">NAME</th>
                            <th scope="col">TYPE</th>
                            <th scope="col">VOTES</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($feedbacks as $index => $feedback)
                            <tr>
                                <th scope="row">{{ $index + 1 }}</th>
                                <td>{{ $feedback->name }}</td>
                                <td>{{ $feedback->type }}</td>
                                <td>{{ $feedback->votes }}</td>
                                <td>
                                    <a href="{{ route('admin.feedback.delete', ['id' => $feedback->id]) }}">
                                        <button class="btn btn-sm btn-secondary">Delete</button>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="d-flex justify-content-center">
                    {!! $users->links('pagination::bootstrap-4') !!}
                </div>
            </div>
        </div>
    </div>
@endsection
