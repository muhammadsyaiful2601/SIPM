<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureResetPasswordUrl();
    }

    /**
     * Aplikasi ini murni API, jadi tautan reset kata sandi diarahkan
     * ke halaman SPA, bukan ke route web Laravel.
     */
    private function configureResetPasswordUrl(): void
    {
        $frontendUrl = rtrim((string) config('app.frontend_url'), '/');

        if ($frontendUrl === '') {
            return;
        }

        ResetPassword::createUrlUsing(function (
            object $notifiable,
            string $token,
        ) use ($frontendUrl): string {
            $query = http_build_query([
                'token' => $token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ]);

            return "{$frontendUrl}/reset-password?{$query}";
        });
    }
}
