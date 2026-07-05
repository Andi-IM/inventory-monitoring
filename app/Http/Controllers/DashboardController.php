<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Borrowing\Models\Loan;
use Modules\Inventory\Models\ItemUnit;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('dashboard/index', [
            'stats' => [
                'total_units' => ItemUnit::query()->count(),
                'available_units' => ItemUnit::query()->where('status', ItemUnit::StatusAvailable)->count(),
                'borrowed_units' => ItemUnit::query()->where('status', ItemUnit::StatusBorrowed)->count(),
                'active_loans' => Loan::query()->whereIn('status', [Loan::StatusActive, Loan::StatusPartiallyReturned, Loan::StatusOverdue])->count(),
                'overdue_loans' => Loan::query()
                    ->whereIn('status', [Loan::StatusActive, Loan::StatusPartiallyReturned, Loan::StatusOverdue])
                    ->where('due_at', '<', now())
                    ->count(),
            ],
            'can' => [
                'manageAccess' => $request->user()?->can('manage-access') ?? false,
                'manageInventory' => $request->user()?->can('manage-inventory') ?? false,
                'manageBorrowing' => $request->user()?->can('manage-borrowing') ?? false,
            ],
        ]);
    }
}
