<?php

namespace Modules\Borrowing\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Modules\Borrowing\Models\LoanItem;

class ReturnLoanItemRequest extends FormRequest
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
            'return_condition' => ['required', Rule::in([
                LoanItem::ConditionNormal,
                LoanItem::ConditionDamaged,
                LoanItem::ConditionLost,
            ])],
            'return_notes' => ['nullable', 'string'],
        ];
    }
}
