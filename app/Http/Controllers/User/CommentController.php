<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function getUsers()
    {
        return User::whereNot('id', auth()->user()->id)
            ->pluck('name')
            ->toArray();
    }

    public function store(Request $request)
    {
        $comment_settings = env('COMMENT_SETTINGS', '');
        if ($comment_settings && $comment_settings == 'disabled') {
            return response()->json([
                'error' => 'Admin has turned off the comments!',
            ], 400);
        }

        Comment::create([
            'feedback_id' => $request->feedback_id,
            'user_id' => auth()->user()->id,
            'content' => $request->data,
        ]);

        return response()->json([
            'success' => true
        ]);
    }
}
