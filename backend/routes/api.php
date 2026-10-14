<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:6,1');

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
