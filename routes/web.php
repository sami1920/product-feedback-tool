<?php

use App\Http\Controllers\Admin\AdminController;
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

Route::get('/home', function() {
    if(auth()->user()->role == 'admin') {
        return redirect('/admin');
    }
    return redirect('/user');
})->name('home');

// Admin Routes
Route::get('/admin', [AdminController::class, 'index']);

// User Routes
Route::get('/user', [UserController::class, 'index']);