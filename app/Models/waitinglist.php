<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class waitinglist extends Model
{
    use HasFactory;
    protected $table = 'waitinglist';
    protected $fillable = [
        'name',
        'email'
    ];
}
