<?php

namespace App\Enums;

enum ComplaintCategory: string
{
    case Fasilitas = 'fasilitas';
    case Akademik = 'akademik';
    case KekerasanPerundungan = 'kekerasan_perundungan';

    public function label(): string
    {
        return match ($this) {
            self::Fasilitas => 'Fasilitas',
            self::Akademik => 'Akademik',
            self::KekerasanPerundungan => 'Kekerasan dan Perundungan',
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
