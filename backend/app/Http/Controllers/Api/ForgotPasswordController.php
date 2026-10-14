<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    /**
     * Kirim tautan pengaturan ulang kata sandi.
     *
     * Respons selalu sama baik email terdaftar atau tidak, supaya
     * halaman ini tidak bisa dipakai menebak email yang aktif.
     */
    public function store(ForgotPasswordRequest $request): JsonResponse
    {
        $identifier = trim($request->string('identifier')->toString());

        $user = $request->identifierIsNim()
            ? User::query()
                ->where('nim_or_nip', $identifier)
                ->where('role', UserRole::Mahasiswa)
                ->first()
            : User::query()->where('email', $identifier)->first();

        if ($user && $user->email) {
            $status = Password::sendResetLink(['email' => $user->email]);

            if ($status !== Password::RESET_LINK_SENT) {
                Log::warning('Tautan reset kata sandi gagal dikirim.', [
                    'status' => $status,
                    'user_id' => $user->id,
                ]);
            }
        }

        return response()->json([
            'message' => 'Jika akun tersebut terdaftar, tautan pengaturan ulang kata sandi telah dikirim ke email terdaftar.',
        ]);
    }
}
