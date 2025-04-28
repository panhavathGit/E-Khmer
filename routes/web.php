<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;

Route::post('/products/create', [ProductController::class, 'store']);
Route::get('/', [ProductController::class, 'index']);
Route::delete('/products/delete/{id}',[ProductController::class, 'destroy']);
Route::put('/products/update/{id}',[ProductController::class, 'update']);
Route::get('/products/dashboard', [ProductController::class,'dashboard']);
Route::get('/about', function(){
    return Inertia::render('About');
});
Route::get('/contact', function(){  
    return Inertia::render('Contact');
});

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
