<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class incidents extends Model
{
    use HasFactory;
    use HasTimestamps;

    protected $fillable = [
        'date',
        'sort_injury',
        'patient_id',
        // We don't need place in this model @Hendrick @Demi
    ];
}
