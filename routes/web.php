<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

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
    Route::get('/admin/{id}/delete', [AdminUserController::class, 'delete'])->name('admin.user.delete');

    // List & Delete Feedback Items
    Route::get('/admin/feedbacks', [FeedbackController::class, 'index'])->name('admin.feedbacks');
    Route::get('/admin/{id}/delete', [FeedbackController::class, 'delete'])->name('admin.feedback.delete');

    // Enable/Disable Comments
    Route::get('/admin/settings', [SettingsController::class, 'index'])->name('admin.settings');
    Route::post('/admin/comments/action', [SettingsController::class, 'update'])->name('admin.comments.action');
});


// User Routes
Route::middleware(['role:user', 'auth'])->group(function () {
    Route::get('/user', [UserController::class, 'index']);
});
