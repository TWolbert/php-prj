<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rooms extends Model
{
    use HasFactory;
    use HasTimestamps;

    protected $fillable = [
      'number',
      'room_type_id',
      'room_taken', 
      'rent' 
    ];
}
