<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'nim_or_nip' => '2210112345',
                'name' => 'Abdul Hadi',
                'email' => '2210112345@mahasiswa.psdku-tanahdatar.ac.id',
                'password' => 'password',
                'role' => UserRole::Mahasiswa,
            ],
            [
                'nim_or_nip' => '2210112346',
                'name' => 'Muhammad Syaiful',
                'email' => '2210112346@mahasiswa.psdku-tanahdatar.ac.id',
                'password' => 'password',
                'role' => UserRole::Mahasiswa,
            ],
            [
                'nim_or_nip' => '198704122011011001',
                'name' => 'Rahmatul Fadillah',
                'email' => 'satgas@psdku-tanahdatar.ac.id',
                'password' => 'password',
                'role' => UserRole::Satellite,
            ],
            [
                'nim_or_nip' => '197803152008011002',
                'name' => 'Suci Ramdha Joenedy',
                'email' => 'pembina@psdku-tanahdatar.ac.id',
                'password' => 'password',
                'role' => UserRole::Pembina,
            ],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                [
                    'nim_or_nip' => $user['nim_or_nip'],
                    'name' => $user['name'],
                    'password' => Hash::make($user['password']),
                    'role' => $user['role'],
                    'is_active' => true,
                ],
            );
        }
    }
}
