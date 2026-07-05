<?php

namespace Modules\Access\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GroupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-access') === true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $group = $this->route('group');

        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('groups', 'name')->ignore($group)],
            'type' => ['nullable', Rule::in(['kelas', 'lab', 'departemen', 'lainnya'])],
            'description' => ['nullable', 'string'],
        ];
    }
}
