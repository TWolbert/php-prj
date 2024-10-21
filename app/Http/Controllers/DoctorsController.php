<?php

namespace App\Http\Controllers;

use App\Models\doctors;
use App\Http\Requests\StoredoctorsRequest;
use App\Http\Requests\UpdatedoctorsRequest;
use Inertia\Inertia;

class DoctorsController extends Controller
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
        return Inertia::render('DoctorCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoredoctorsRequest $request)
    {
        // Check for duplicates
        $doctor = doctors::where('firstname', $request->firstname)
            ->where('lastname', $request->lastname)
            ->where('place', $request->place)
            ->first();

        if ($doctor) {
            return response()->json(['error' => 'Doctor already exists'], 400);
        }
        
        doctors::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(doctors $doctors)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(doctors $doctors)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatedoctorsRequest $request, doctors $doctors)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(doctors $doctors)
    {
        //
    }
}
