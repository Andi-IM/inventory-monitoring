<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['item_id', 'asset_code', 'location', 'status'])]
class ItemUnit extends Model
{
    public const StatusAvailable = 'available';

    public const StatusBorrowed = 'borrowed';

    protected $attributes = [
        'status' => self::StatusAvailable,
    ];

    /**
     * @return BelongsTo<Item, $this>
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
