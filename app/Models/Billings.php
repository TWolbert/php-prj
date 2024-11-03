<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billings extends Model
{
    use HasFactory;
    protected $fillable = [
        'patient_id',
        'room_id',
        'care_costs', 
        'rent_per_day' ,
        'days_in_room',
        'total_cost'
      ];
}
