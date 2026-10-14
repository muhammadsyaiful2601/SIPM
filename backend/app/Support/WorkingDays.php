<?php

namespace App\Support;

use Illuminate\Support\Carbon;

class WorkingDays
{
    /**
     * Jumlah hari kerja (Senin-Jumat) antara dua tanggal.
     * Tanggal awal tidak dihitung bila sudah bukan hari kerja.
     */
    public static function between(Carbon $from, Carbon $to): int
    {
        if ($to->lessThanOrEqualTo($from)) {
            return 0;
        }

        $total = 0;
        $cursor = $from->copy()->startOfDay();

        while ($cursor->lessThan($to->copy()->startOfDay())) {
            if ($cursor->isWeekday()) {
                $total++;
            }

            $cursor->addDay();
        }

        return $total;
    }
}
