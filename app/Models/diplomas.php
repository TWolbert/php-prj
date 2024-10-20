<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class diplomas extends Model
{
    use HasFactory;
    use HasTimestamps;

    protected $fillable = [
        'doctor_id',
        'diploma_name',
        'school',
    ];
}
