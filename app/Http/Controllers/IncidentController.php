<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incident;

class IncidentController extends Controller
{
    public function getIncidents($id)
    {
        $incidents = Incident::findOrFail($id);
        return response()->json($incidents);
    }
}