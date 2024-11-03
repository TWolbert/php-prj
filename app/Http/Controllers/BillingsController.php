<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBillingsRequest;
use Illuminate\Http\Request;
use App\Models\Billings;

class BillingsController extends Controller
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
    public function store(StoreBillingsRequest $request)
    {
        $billing = Billings::where('patient_id',$request->patient_id)
        ->first();

        if ($billing) {
            return response()->json(['error' => 'Er is al een facturatie gemaakt met dit patient_id'], 400);
        }

        Billings::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Billings $billings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Billings $billings)
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
    public function destroy(Billings $billings)
    {
        //
    }
}
