<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreroomsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->role == 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'number' => ['required', 'string', 'max:255'],
            'room_type_id' => ['required'],
            'room_taken' => ['required', 'boolean'],
        ];
    }
}
