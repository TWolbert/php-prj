<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBillingsRequest extends FormRequest
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
            'patient_id' => ['required', 'numeric'],
            'room_id' => ['required', 'numeric'], 
            'care_costs' => ['required', 'numeric'],
            'rent_per_day' => ['required', 'numeric'],
            'days_in_room' => ['required', 'numeric'],
            'total_cost' => ['required', 'numeric']
        ];
    }
}
