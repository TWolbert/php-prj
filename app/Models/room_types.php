<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class room_types extends Model
{
    use HasFactory;
    use HasTimestamps;

    protected $fillable = [
        'multiple_people',
    ];
}