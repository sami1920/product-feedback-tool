@extends('layouts.admin-app')

@section('content')
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Settings</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col-10">
                <form action="{{ route('admin.comments.action') }}" method="POST">
                    @csrf
                    <label>Comments:</label>
                    <div class="row justify-content-center">
                        <select class="form-select w-75" aria-label="Select comments settings" name="comments">
                            <option value="enabled" {{ $comment_settings == 'enabled' ? 'selected' : '' }}>Enable</option>
                            <option value="disabled" {{ $comment_settings == 'disabled' ? 'selected' : '' }}>Disable</option>
                        </select>
                    </div>
                    <div class="row justify-content-center mt-5">
                        <button class="btn btn-sm btn-primary w-100" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
