<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class extra extends Model
{
    use HasFactory;
    use HasTimestamps;

    protected $fillable = [
        'patient_id',
        'reason_for_intake',
        'patient_type_id',
        'current_disease',
        'last_treatment_date',
        'next_treatment_date'
    ];
}
