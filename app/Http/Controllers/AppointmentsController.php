<?php

namespace App\Http\Controllers;

use App\Models\appointments;
use App\Http\Requests\StoreappointmentsRequest;
use App\Http\Requests\UpdateappointmentsRequest;
use Inertia\Inertia;

class AppointmentsController extends Controller
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
        return Inertia::render('Appointment');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreappointmentsRequest $request)
    {
        appointments::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(appointments $appointments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(appointments $appointments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateappointmentsRequest $request, appointments $appointments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(appointments $appointments)
    {
        //
    }
}
