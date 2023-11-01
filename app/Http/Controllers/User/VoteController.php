<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function store($id)
    {
        $userId = auth()->user()->id;

        // Check if a vote already exists for the user and feedback
        $existingVote = Vote::where('user_id', $userId)
            ->where('feedback_id', $id)
            ->first();

        if ($existingVote) {
            return response()->json([
                'error' => 'You have already submitted the vote!',
            ], 400);
        }
        
        Vote::create([
            'user_id' => auth()->user()->id,
            'feedback_id' => $id,
        ]);

        return response()->json([
            'success' => true
        ]);
    }
}
