<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

// Authentication
Route::get('/',function(){
    return Inertia::render('Auth/Login');
});
Route::post('/register',[RegisteredUserController::class,'store'])->name('register');
Route::post('/logout',[AuthenticatedSessionController::class,'destroy']);

// User routes
Route::prefix('users')->group(function(){
    Route::get('/dashboard',[UserController::class,'index'])->middleware('permission:user-list');
    Route::put('/{user}', [UserController::class, 'update'])->name('users.update')->middleware('permission:user-update');
});

// Product routes
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', [ProductController::class, 'dashboard'])->name('dashboard')->middleware('permission:product-list');
    Route::post('/create', [ProductController::class, 'store'])->middleware('permission:product-create');
    Route::put('/update/{id}', [ProductController::class, 'update'])->middleware('permission:product-update');
    Route::delete('/delete/{id}', [ProductController::class, 'destroy'])->middleware('permission:product-delete');
});

// Role routes
Route::prefix('roles')->group(function () {
    Route::get('/dashboard', [RolesController::class, 'index'])->name('roles.index')->middleware('permission:role-list');
    Route::post('/create', [RolesController::class, 'store'])->middleware('permission:role-create');
    Route::put('/update/{id}', [RolesController::class, 'update']);
    Route::delete('/delete/{id}', [RolesController::class, 'destroy']);
});

// Permission routes
Route::prefix('permissions')->group(function () {
    Route::get('/dashboard', [PermissionsController::class, 'index'])->name('permissions.index')->middleware('permission:permission-list');
    Route::post('/create', [PermissionsController::class, 'store']);
    Route::post('/update', [PermissionsController::class, 'update']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
