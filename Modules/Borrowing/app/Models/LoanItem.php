<?php

namespace Modules\Borrowing\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $loan_id
 * @property Carbon|null $returned_at
 */
#[Fillable(['loan_id', 'item_unit_id', 'returned_at', 'return_condition', 'return_notes'])]
class LoanItem extends Model
{
    public const ConditionNormal = 'normal';

    public const ConditionDamaged = 'rusak';

    public const ConditionLost = 'hilang';

    protected function casts(): array
    {
        return [
            'returned_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<Loan, $this>
     */
    public function loan(): BelongsTo
    {
        return $this->belongsTo(Loan::class);
    }
}
