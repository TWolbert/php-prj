<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class appointments extends Model
{
    use HasFactory;
    use HasTimestamps;

    protected $fillable = [
        'date',
        'time',
        'patient_id',
        'place',
    ];
}
