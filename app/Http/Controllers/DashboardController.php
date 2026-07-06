<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Borrowing\Contracts\BorrowingClientInterface;
use Modules\Inventory\Contracts\InventoryClientInterface;

class DashboardController extends Controller
{
    public function __invoke(Request $request, InventoryClientInterface $inventoryClient, BorrowingClientInterface $borrowingClient): Response
    {
        return Inertia::render('dashboard/index', [
            'stats' => [
                'total_units' => $inventoryClient->getTotalItemUnitsCount(),
                'available_units' => $inventoryClient->getItemUnitsCountByStatus('available'),
                'borrowed_units' => $inventoryClient->getItemUnitsCountByStatus('borrowed'),
                'active_loans' => $borrowingClient->getActiveLoansCount(),
                'overdue_loans' => $borrowingClient->getOverdueLoansCount(),
            ],
            'can' => [
                'manageAccess' => $request->user()?->can('manage-access') ?? false,
                'manageInventory' => $request->user()?->can('manage-inventory') ?? false,
                'manageBorrowing' => $request->user()?->can('manage-borrowing') ?? false,
            ],
        ]);
    }
}
