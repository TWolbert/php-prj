<?php

namespace App\Http\Controllers;

use App\Models\patient_types;
use App\Http\Requests\Storepatient_typesRequest;
use App\Http\Requests\Updatepatient_typesRequest;

class PatientTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Storepatient_typesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(patient_types $patient_types)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(patient_types $patient_types)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updatepatient_typesRequest $request, patient_types $patient_types)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(patient_types $patient_types)
    {
        //
    }
}
