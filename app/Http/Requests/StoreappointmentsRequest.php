<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreappointmentsRequest extends FormRequest
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
            'date' => ['required', 'date'],
            'time' => ['required', 'string', 'max:255'],
            'patient_id' => ['required', 'integer'],
            'place' => ['required', 'string', 'max:255'],
        ];
    }
}
