<?php

namespace Modules\Borrowing\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Modules\Inventory\Models\ItemUnit;

/**
 * @property int $id
 * @property int $loan_id
 * @property int $item_unit_id
 * @property Carbon|null $returned_at
 * @property string|null $return_condition
 * @property string|null $return_notes
 * @property-read Loan $loan
 * @property-read ItemUnit|null $itemUnit
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

    /**
     * @return BelongsTo<ItemUnit, $this>
     */
    public function itemUnit(): BelongsTo
    {
        return $this->belongsTo(ItemUnit::class);
    }
}
