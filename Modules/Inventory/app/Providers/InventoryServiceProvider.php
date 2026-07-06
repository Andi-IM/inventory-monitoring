<?php

namespace Modules\Inventory\Providers;

use Modules\Inventory\Contracts\InventoryClientInterface;
use Modules\Inventory\Services\InventoryClientService;
use Nwidart\Modules\Support\ModuleServiceProvider;

class InventoryServiceProvider extends ModuleServiceProvider
{
    /**
     * The name of the module.
     */
    protected string $name = 'Inventory';

    /**
     * The lowercase version of the module name.
     */
    protected string $nameLower = 'inventory';

    /**
     * Provider classes to register.
     *
     * @var string[]
     */
    protected array $providers = [
        RouteServiceProvider::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        parent::register();

        $this->app->bind(
            InventoryClientInterface::class,
            InventoryClientService::class
        );
    }
}
