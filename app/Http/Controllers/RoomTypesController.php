<?php

namespace App\Http\Controllers;

use App\Models\room_types;
use App\Http\Requests\Storeroom_typesRequest;
use App\Http\Requests\Updateroom_typesRequest;

class RoomTypesController extends Controller
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
    public function store(Storeroom_typesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(room_types $room_types)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(room_types $room_types)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updateroom_typesRequest $request, room_types $room_types)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(room_types $room_types)
    {
        //
    }
}
