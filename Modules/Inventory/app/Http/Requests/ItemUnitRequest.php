<?php

namespace Modules\Inventory\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Modules\Inventory\Models\ItemUnit;

class ItemUnitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-inventory') === true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $unit = $this->route('item_unit');

        return [
            'item_id' => ['required', 'integer', 'exists:items,id'],
            'asset_code' => ['required', 'string', 'max:255', Rule::unique('item_units', 'asset_code')->ignore($unit)],
            'location' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in([ItemUnit::StatusAvailable, ItemUnit::StatusBorrowed])],
        ];
    }
}
