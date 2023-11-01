<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::with('user')->withCount('votes')->paginate(8);
        return view('admin.feedbacks.index', compact('feedbacks'));
    }

    public function delete($id)
    {
        $feedback = Feedback::find($id);
        if ($feedback) {
            $feedback->delete();
        }
        return redirect()->route('admin.feedbacks');
    }
}
