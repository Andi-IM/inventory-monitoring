<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $item_id
 * @property string $asset_code
 * @property string|null $location
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Item|null $item
 */
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
