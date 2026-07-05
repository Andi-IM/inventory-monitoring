<?php

namespace Modules\Borrowing\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Modules\Inventory\Models\ItemUnit;

class StoreLoanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-borrowing') === true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'borrower_type' => ['required', Rule::in(['internal', 'external'])],
            'borrower_user_id' => ['required_if:borrower_type,internal', 'nullable', 'integer', 'exists:users,id'],
            'external_borrower_id' => ['required_if:borrower_type,external', 'nullable', 'integer', 'exists:external_borrowers,id'],
            'due_at' => ['required', 'date', 'after:now'],
            'notes' => ['nullable', 'string'],
            'item_unit_ids' => ['required', 'array', 'min:1'],
            'item_unit_ids.*' => [
                'integer',
                Rule::exists('item_units', 'id')->where('status', ItemUnit::StatusAvailable),
            ],
        ];
    }

    /**
     * @return array<int, int>
     */
    public function itemUnitIds(): array
    {
        return array_map('intval', $this->array('item_unit_ids'));
    }
}
