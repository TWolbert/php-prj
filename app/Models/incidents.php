<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class incidents extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'sort_injury',
        'patient_id'
    ];
}
