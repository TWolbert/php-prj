<?php

namespace App\Http\Controllers;

use App\Models\patients;
use App\Http\Requests\StorepatientsRequest;
use App\Http\Requests\UpdatepatientsRequest;

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
        //
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
        //
    }
}
