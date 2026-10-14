<?php

namespace App\Enums;

enum UserRole: string
{
    case Mahasiswa = 'mahasiswa';
    case Satellite = 'satgas';
    case Pembina = 'pembina';
    case Unit = 'unit';

    public function label(): string
    {
        return match ($this) {
            self::Mahasiswa => 'Mahasiswa',
            self::Satellite => 'Admin PPKPT',
            self::Pembina => 'Pembina Kemahasiswaan',
            self::Unit => 'Unit Kampus',
        };
    }

    /**
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
