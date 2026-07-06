<?php

namespace Modules\Borrowing\Providers;

use Illuminate\Console\Scheduling\Schedule;
use Modules\Borrowing\Contracts\BorrowingClientInterface;
use Modules\Borrowing\Services\BorrowingClientService;
use Nwidart\Modules\Support\ModuleServiceProvider;

class BorrowingServiceProvider extends ModuleServiceProvider
{
    /**
     * The name of the module.
     */
    protected string $name = 'Borrowing';

    /**
     * The lowercase version of the module name.
     */
    protected string $nameLower = 'borrowing';

    /**
     * Command classes to register.
     *
     * @var string[]
     */
    // protected array $commands = [];

    /**
     * Provider classes to register.
     *
     * @var string[]
     */
    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];

    /**
     * Define module schedules.
     *
     * @param  $schedule
     */
    // protected function configureSchedules(Schedule $schedule): void
    // {
    //     $schedule->command('inspire')->hourly();
    // }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        parent::register();

        $this->app->bind(
            BorrowingClientInterface::class,
            BorrowingClientService::class
        );
    }
}
