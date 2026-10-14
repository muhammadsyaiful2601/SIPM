<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'identifier' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'in:mahasiswa,staf'],
        ];
    }

    public function messages(): array
    {
        return [
            'identifier.required' => 'NIM atau email wajib diisi.',
            'identifier.max' => 'NIM atau email terlalu panjang.',
            'role.required' => 'Pilih jenis akun terlebih dahulu.',
            'role.in' => 'Jenis akun tidak valid.',
        ];
    }

    public function identifierIsNim(): bool
    {
        return $this->input('role') === 'mahasiswa';
    }
}
