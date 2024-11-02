<?php

use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\DoctorsController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomsController;
use App\Models\appointments;
use App\Models\doctors;
use App\Models\address;
use App\Models\Patient;
use App\Models\rooms;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/appointment',function(){
    return Inertia::render('Appointment');
})->name('appointment');

Route::get('/archive',function(){
    return Inertia::render('Archive',[
        'patients' => Patient::all(),
        'doctors' => doctors::all(),
        'rooms' => rooms::all(),
        'address' => address::all()
    ]);
})->name('archive');

Route::get('/patientinfo/{id}',function($id){
    return Inertia::render('Patientinfo',[
        'patients' => Patient::findOrFail($id)
    ]);
})->name('patientinfo');

Route::get('/patients',function(){
    return Inertia::render('Patients',[
        'patients' => Patient::all()
    ]);
})->middleware(['auth', 'verified'])->name('patients');

Route::get('/patients/create',function(){
    return Inertia::render('PatientCreate', [
        'doctors' => doctors::all(),
        'rooms' => rooms::all()
    ]);
})->middleware(['auth', 'verified'])->name('patientcreate');

Route::get('/voorvallen',function(){
    return Inertia::render('Voorvallen');
})->name('voorvallen');




//Route::post('/afspraken',[AppointmentController::class,'CreateAppointment'])->name('afspraken.CreateAppointment');
//Route::get('/getappointments', [AppointmentController::class,'GetAppointments'])->name('afspraken.GetAppointments');
//Route::get('/getincidents/{id}',[IncidentController::class,'getIncidents'])->name('/getincidents.getIncidents');

//Route::get('/getpatients/{id}',[PatientController::class,'getPatients'])->name('patientinfo.getPatients');

// Tie Doctor controller to /doctor using resource
Route::resource('doctors', DoctorsController::class)->middleware(['auth', 'verified']);
Route::resource('rooms', RoomsController::class)->middleware(['auth', 'verified']);
Route::resource('appointments', AppointmentsController::class)->middleware(['auth', 'verified']);

//Route::patch('/updatepatients/{id}',[PatientController::class,'updatePatients'])->name('patientinfo.updatePatients');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
