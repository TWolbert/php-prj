<?php

namespace App\Http\Controllers;

use App\Models\rooms;
use App\Http\Requests\StoreroomsRequest;
use App\Http\Requests\UpdateroomsRequest;
use Inertia\Inertia;

class RoomsController extends Controller
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
        return Inertia::render('RoomCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreroomsRequest $request)
    {
        // Check for duplicates
        $room = rooms::where('number', $request->room_number)
            ->where('room_type_id', $request->room_type)
            ->first();

        if ($room) {
            return response()->json(['error' => 'Room already exists'], 400);
        }
        
        rooms::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(rooms $rooms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(rooms $rooms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateroomsRequest $request, rooms $rooms)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(rooms $rooms)
    {
        //
    }
}
