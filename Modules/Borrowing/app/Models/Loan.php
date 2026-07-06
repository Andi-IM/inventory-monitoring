<?php

namespace Modules\Borrowing\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property Carbon $due_at
 */
#[Fillable(['code', 'borrower_user_id', 'external_borrower_id', 'recorded_by_user_id', 'borrowed_at', 'due_at', 'returned_at', 'status', 'notes'])]
class Loan extends Model
{
    public const StatusActive = 'active';

    public const StatusPartiallyReturned = 'partially_returned';

    public const StatusReturned = 'returned';

    public const StatusOverdue = 'overdue';

    protected $attributes = [
        'status' => self::StatusActive,
    ];

    protected function casts(): array
    {
        return [
            'borrowed_at' => 'datetime',
            'due_at' => 'datetime',
            'returned_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function borrowerUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'borrower_user_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by_user_id');
    }

    /**
     * @return HasMany<LoanItem, $this>
     */
    public function loanItems(): HasMany
    {
        return $this->hasMany(LoanItem::class);
    }

    public function refreshStatus(): void
    {
        $this->loadMissing('loanItems');

        $total = $this->loanItems->count();
        $returned = $this->loanItems->whereNotNull('returned_at')->count();

        if ($total > 0 && $returned === $total) {
            $this->forceFill([
                'status' => self::StatusReturned,
                'returned_at' => now(),
            ])->save();

            return;
        }

        $status = $returned > 0 ? self::StatusPartiallyReturned : self::StatusActive;

        if ($this->due_at->isPast()) {
            $status = self::StatusOverdue;
        }

        $this->forceFill([
            'status' => $status,
            'returned_at' => null,
        ])->save();
    }
}
