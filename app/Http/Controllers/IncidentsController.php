<?php

namespace App\Http\Controllers;

use App\Models\incidents;
use App\Http\Requests\StoreincidentsRequest;
use App\Http\Requests\UpdateincidentsRequest;
use Inertia\Inertia;

class IncidentsController extends Controller
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
        return Inertia::render('Incidenten');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreincidentsRequest $request)
    {
          // Check for duplicates
          //er kunnen toch geen duplicates incidents zijn?
          $incidents = incidents::where('sort_injury', $request->sort_injury)
          ->first();

      if ($incidents) {
          return response()->json(['error' => 'Room already exists'], 400);
      }
      
      incidents::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(incidents $incidents)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(incidents $incidents)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateincidentsRequest $request, incidents $incidents)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(incidents $incidents)
    {
        //
    }
}
