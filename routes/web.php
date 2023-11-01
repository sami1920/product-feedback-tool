<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\User\CommentController;
use App\Http\Controllers\User\FeedbackController as UserFeedbackController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\VoteController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', function () {
    if (auth()->user()->role == 'admin') {
        return redirect('/admin');
    }
    return redirect('/user');
})->name('home');

// Admin Routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');

    // List & Delete Users
    Route::get('/admin/users', [AdminUserController::class, 'index'])->name('admin.users');
    Route::post('/admin/{id}/delete', [AdminUserController::class, 'delete'])->name('admin.user.delete');

    // List & Delete Feedback Items
    Route::get('/admin/feedbacks', [FeedbackController::class, 'index'])->name('admin.feedbacks');
    Route::post('/admin/feedback/{id}/delete', [FeedbackController::class, 'delete'])->name('admin.feedback.delete');

    // Enable/Disable Comments
    Route::get('/admin/settings', [SettingsController::class, 'index'])->name('admin.settings');
    Route::post('/admin/comments/action', [SettingsController::class, 'update'])->name('admin.comments.action');
});


// User Routes
Route::middleware(['role:user', 'auth'])->group(function () {
    // Feedbacks List
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/feedbacks', [UserController::class, 'getPaginatedFeedbacks']);

    // Feedback Form
    Route::get('/user/feedback/create', [UserFeedbackController::class, 'create'])->name('user.feedbacks.create');
    Route::post('/user/feedback/store', [UserFeedbackController::class, 'store'])->name('user.feedbacks.store');

    // Submit Vote
    Route::get('/user/vote/store/{id}', [VoteController::class, 'store'])->name('user.votes.store');

    // Comments operations
    Route::get('/users/list', [CommentController::class, 'getUsers']);
    Route::post('/user/submit-comment', [CommentController::class, 'store'])->name('user.comments.store');
});
