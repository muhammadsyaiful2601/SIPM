<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $identifier = trim($request->string('identifier')->toString());
        $useNim = $request->identifierIsNim();

        $user = $useNim
            ? User::query()
                ->where('nim_or_nip', $identifier)
                ->where('role', UserRole::Mahasiswa)
                ->first()
            : User::query()
                ->where('email', $identifier)
                ->whereIn('role', [
                    UserRole::Satellite,
                    UserRole::Pembina,
                    UserRole::Unit,
                ])
                ->first();

        if (! $user || ! Hash::check($request->string('password')->toString(), $user->password)) {
            throw ValidationException::withMessages([
                'identifier' => $useNim
                    ? 'NIM atau kata sandi tidak cocok.'
                    : 'Email atau kata sandi tidak cocok.',
            ]);
        }

        if (! $user->is_active) {
            throw ValidationException::withMessages([
                'identifier' => 'Akun Anda sedang dinonaktifkan. Hubungi petugas PPKPT.',
            ]);
        }

        $user->tokens()->where('name', 'sipm-web')->delete();

        $token = $user->createToken('sipm-web')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'token' => $token,
            'user' => new UserResource($user),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($request->user()),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Berhasil keluar.',
        ]);
    }
}
