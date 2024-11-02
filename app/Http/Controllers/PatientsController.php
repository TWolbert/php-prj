<?php

namespace App\Http\Controllers;

use App\Models\patients;
use App\Http\Requests\StorepatientsRequest;
use App\Http\Requests\UpdatepatientsRequest;
use App\Models\address;
use App\Models\extra;

class PatientsController extends Controller
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
    public function store(StorepatientsRequest $request)
    {
        $extra = extra::create($request->validated()['extra']);
        $extraId = $extra->id;

        $address = address::create($request->validated()['address']);
        $addressId = $address->id;

        $patient = $request->validated()['patient'];
        $patient['extra_id'] = $extraId;
        $patient['address_id'] = $addressId;

        patients::create($patient);

        // Return confirmation message
        return ['message' => 'Patient created'];
    }

    /**
     * Display the specified resource.
     */
    public function show(patients $patients)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(patients $patients)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatepatientsRequest $request, patients $patients)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(patients $patients)
    {
        // add patient id to archive table
        
    }
}
