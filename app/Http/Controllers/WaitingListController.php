<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\waitinglist;
use App\Http\Requests\StorewaitinglistRequest;
use Inertia\Inertia;

class WaitingListController extends Controller
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
        return Inertia::render('WaitingList'); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorewaitinglistRequest $request)
    {
        $list = waitinglist::where('name', $request->name)
        ->where('email', $request->email)
        ->first();

    if ($list) {
        return response()->json(['error' => 'U bent al ingeschreven'], 400);
    }
        waitinglist::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(waitinglist $waitinglist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(waitinglist $waitinglist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(waitinglist $waitinglist)
    {
        //
    }
}
