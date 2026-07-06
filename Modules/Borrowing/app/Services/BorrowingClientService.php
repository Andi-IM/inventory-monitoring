<?php

namespace Modules\Borrowing\Services;

use Modules\Borrowing\Contracts\BorrowingClientInterface;
use Modules\Borrowing\Models\Loan;

class BorrowingClientService implements BorrowingClientInterface
{
    public function getActiveLoansCount(): int
    {
        return Loan::whereIn('status', [Loan::StatusActive, Loan::StatusPartiallyReturned, Loan::StatusOverdue])->count();
    }

    public function getOverdueLoansCount(): int
    {
        return Loan::whereIn('status', [Loan::StatusActive, Loan::StatusPartiallyReturned, Loan::StatusOverdue])
            ->where('due_at', '<', now())
            ->count();
    }
}
