<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
class AppointmentController extends Controller
{
    public function CreateAppointment(Request $request)
    {
        $Data = $request->validate([
            
            'date' => 'required|date',
            'time' => 'required',
            'patient_id' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            //'subject' => 'required|string|max:255',
            //'description' => 'required|string|max:255',
        ]);
        $appointment = Appointment::create($Data);
        return response()->json($appointment,201);
    }
    public function GetAppointments()
    {
        $appointments = Appointment::select('id','date','time','patient_id','place')->get();
        return response()->json($appointments,200);
    }
}
