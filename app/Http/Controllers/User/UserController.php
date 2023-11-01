<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return view('user.home');
    }

    public function getPaginatedFeedbacks()
    {
        $feedbacks = Feedback::with('user')->paginate(8);
        return $feedbacks;
    }
}
