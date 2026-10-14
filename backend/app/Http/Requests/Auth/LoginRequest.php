<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'identifier' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:6', 'max:255'],
            'role' => [
                'required',
                'string',
                Rule::in(['mahasiswa', 'staf']),
            ],
            'remember' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'identifier.required' => 'NIM atau email wajib diisi.',
            'password.required' => 'Kata sandi wajib diisi.',
            'password.min' => 'Kata sandi minimal 6 karakter.',
            'role.required' => 'Pilih jenis akun terlebih dahulu.',
            'role.in' => 'Jenis akun tidak valid.',
        ];
    }

    public function identifierIsNim(): bool
    {
        return $this->input('role') === 'mahasiswa';
    }
}
