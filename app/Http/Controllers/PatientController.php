<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    public function getPatients ()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }
}
