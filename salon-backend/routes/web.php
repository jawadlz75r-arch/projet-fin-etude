<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SalonController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController;

/*
|--------------------------------------------------------------------------
| Home route
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'Salon API is running 🚀'
    ]);
});

/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// Salons
Route::get('/salons', [SalonController::class, 'index']);
Route::get('/salons/{salon}', [SalonController::class, 'show']);

// Services
Route::get('/salons/{salon}/services', [ServiceController::class, 'index']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |-----------------------
    | AUTH
    |-----------------------
    */
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    /*
    |-----------------------
    | OWNER SALONS
    |-----------------------
    */
    Route::get('/my-salons', [SalonController::class, 'mySalons']);
    Route::post('/salons', [SalonController::class, 'store']);
    Route::put('/salons/{salon}', [SalonController::class, 'update']);
    Route::delete('/salons/{salon}', [SalonController::class, 'destroy']);

    /*
    |-----------------------
    | SERVICES
    |-----------------------
    */
    Route::post('/salons/{salon}/services', [ServiceController::class, 'store']);
    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

    /*
    |-----------------------
    | BOOKINGS (CLIENT)
    |-----------------------
    */
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{booking}', [BookingController::class, 'show']);

    /*
    |-----------------------
    | OWNER BOOKINGS
    |-----------------------
    */
    Route::get('/salon-bookings', [BookingController::class, 'salonBookings']);

    /*
    |-----------------------
    | UPDATE STATUS
    |-----------------------
    */
    Route::patch('/bookings/{booking}/status', [BookingController::class, 'updateStatus']);
});