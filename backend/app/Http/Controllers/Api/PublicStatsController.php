<?php

namespace App\Http\Controllers\Api;

use App\Enums\ComplaintStatus;
use App\Http\Controllers\Controller;
use App\Models\Complaint;
use App\Support\WorkingDays;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PublicStatsController extends Controller
{
    /**
     * Statistik publik untuk kartu rekap di landing page.
     * Tidak memerlukan autentikasi dan tidak membuka data pelapor.
     */
    public function index(Request $request): JsonResponse
    {
        $period = Carbon::now()->startOfMonth();

        $complaints = Complaint::query()
            ->where('created_at', '>=', $period)
            ->get(['status', 'created_at', 'first_response_at']);

        $total = $complaints->count();
        $selesai = $complaints
            ->where('status', ComplaintStatus::Selesai)
            ->count();

        $direspon = $complaints->whereNotNull('first_response_at');

        $tepatWaktu = $direspon->filter(
            fn (Complaint $complaint): bool => WorkingDays::between(
                Carbon::parse($complaint->created_at),
                Carbon::parse($complaint->first_response_at),
            ) <= 3
        )->count();

        $diresponCount = $direspon->count();

        $persentase = $diresponCount > 0
            ? (int) round($tepatWaktu / $diresponCount * 100)
            : 0;

        return response()->json([
            'period_label' => Carbon::now()->translatedFormat('F Y'),
            'total' => $total,
            'selesai' => $selesai,
            'direspon' => $diresponCount,
            'tepat_waktu' => $tepatWaktu,
            'persentase_tepat_waktu' => $persentase,
        ]);
    }
}
