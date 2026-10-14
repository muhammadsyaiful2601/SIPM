<?php

namespace App\Enums;

enum ComplaintStatus: string
{
    case Terkirim = 'terkirim';
    case Diproses = 'diproses';
    case Disposisi = 'disposisi';
    case Selesai = 'selesai';

    public function label(): string
    {
        return match ($this) {
            self::Terkirim => 'Terkirim',
            self::Diproses => 'Sedang Diproses Satgas',
            self::Disposisi => 'Disposisi',
            self::Selesai => 'Selesai',
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
