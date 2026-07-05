<?php

namespace App\Providers;

use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

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
        $this->configureAuthorization();
        $this->configureDefaults();
    }

    protected function configureAuthorization(): void
    {
        Gate::before(function (User $user): ?bool {
            return $user->isAdmin() ? true : null;
        });

        Gate::define('manage-access', fn (User $user): bool => $user->isAdmin());
        Gate::define('manage-inventory', fn (User $user): bool => $user->isAdmin() || $user->isPetugas());
        Gate::define('manage-borrowing', fn (User $user): bool => $user->isAdmin() || $user->isPetugas());
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
