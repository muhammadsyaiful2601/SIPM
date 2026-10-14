<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\PublicStatsController;
use App\Http\Controllers\Api\ResetPasswordController;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;

Route::get('/public/stats', [PublicStatsController::class, 'index'])
    ->middleware('throttle:30,1');

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:6,1');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'store'])
        ->middleware('throttle:3,1');
    Route::post('/reset-password', ResetPasswordController::class)
        ->middleware('throttle:5,1');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn () => response()->json([
        'message' => 'OK',
        'user' => new UserResource(request()->user()),
    ]));

    Route::get('/admin/ping', fn () => response()->json(['message' => 'Akses satgas']))
        ->middleware('role:satgas');

    Route::get('/mahasiswa/ping', fn () => response()->json(['message' => 'Akses mahasiswa']))
        ->middleware('role:mahasiswa');
});
