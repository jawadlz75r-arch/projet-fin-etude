<?php
// routes/api.php
// هادا كتكتبو فـ: salon-backend/routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SalonController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController;

// ============================================
// PUBLIC ROUTES (بلا login)
// ============================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Salons - عرض للعموم
Route::get('/salons',         [SalonController::class, 'index']);
Route::get('/salons/{id}',    [SalonController::class, 'show']);

// ============================================
// PROTECTED ROUTES (خاصهم login)
// ============================================
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Salons - صاحب السالون
    Route::post('/salons',         [SalonController::class, 'store']);
    Route::put('/salons/{id}',     [SalonController::class, 'update']);
    Route::delete('/salons/{id}',  [SalonController::class, 'destroy']);

    // Services
    Route::post('/services',        [ServiceController::class, 'store']);
    Route::put('/services/{id}',    [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Bookings
    Route::get('/bookings',          [BookingController::class, 'index']);
    Route::post('/bookings',         [BookingController::class, 'store']);
    Route::put('/bookings/{id}',     [BookingController::class, 'update']);
    Route::delete('/bookings/{id}',  [BookingController::class, 'destroy']);
});