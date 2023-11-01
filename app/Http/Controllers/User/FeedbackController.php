<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function create()
    {
        return view('user.feedbacks.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' =>'required',
            'category' =>'required',
           'description' =>'required',
        ]);

        $feedback = Feedback::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'user_id' => auth()->user()->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Feedback created successfully.'
        ]);
    }
}
