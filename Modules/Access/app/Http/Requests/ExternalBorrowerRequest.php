<?php

namespace Modules\Access\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExternalBorrowerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-access') === true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'group_id' => ['nullable', 'integer', 'exists:groups,id'],
            'name' => ['required', 'string', 'max:255'],
            'identity_number' => ['nullable', 'string', 'max:255'],
            'contact' => ['nullable', 'string', 'max:255'],
        ];
    }
}
