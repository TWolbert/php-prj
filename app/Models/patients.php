<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class patients extends Model
{
    use HasFactory;
    use HasTimestamps;

    protected $fillable = [
        'firstname',
        'lastname',
        'is_dead',
        'is_extern',
        'birth_date',
        'doctor_id',
        'address_id',
        'extra_id',
        'rooom_id',
    ];
}
