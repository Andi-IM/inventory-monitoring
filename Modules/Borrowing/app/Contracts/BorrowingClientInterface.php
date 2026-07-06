<?php

namespace Modules\Borrowing\Contracts;

interface BorrowingClientInterface
{
    /**
     * Get the total count of active loans.
     */
    public function getActiveLoansCount(): int;

    /**
     * Get the total count of overdue loans.
     */
    public function getOverdueLoansCount(): int;
}
