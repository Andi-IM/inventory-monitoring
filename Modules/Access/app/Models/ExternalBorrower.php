<?php

namespace Modules\Access\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $group_id
 * @property string $name
 * @property string|null $identity_number
 * @property string|null $contact
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Group|null $group
 */
#[Fillable(['group_id', 'name', 'identity_number', 'contact'])]
class ExternalBorrower extends Model
{
    /**
     * @return BelongsTo<Group, $this>
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
