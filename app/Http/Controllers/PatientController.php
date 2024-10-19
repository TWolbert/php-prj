<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    public function getPatients ($id)
    {
        $patients = Patient::findOrFail($id);
        return response()->json($patients);
    }

    public function updatePatients (Request $request,$id)
    {
        $patients = Patient::findOrFail($id);
        $patients->firstname = $request->firstname;
        $patients->lastname = $request->lastname;
        $patients->birth_date = $request->birth_date;
        $patients->doctor_id = $request->doctor_id;
        $patients->address_id = $request->address_id;
        $patients->room_id = $request->room_id;
        $patients->save();
        return response()->json(["patient geupdate",$patients]);
    }
}
