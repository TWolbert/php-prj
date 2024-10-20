<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Models\Appointment;
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

Route::get('/afspraken', function () {
    return Inertia::render('Afspraken');
})->name('afspraken');

Route::get('/patientinfo',function(){
    return Inertia::render('Patientinfo');
})->name('patientinfo');

Route::get('/voorvallen',function(){
    return Inertia::render('Voorvallen');
})->name('voorvallen');


Route::post('/afspraken',[AppointmentController::class,'CreateAppointment'])->name('afspraken.CreateAppointment');
Route::get('/getappointments', [AppointmentController::class,'GetAppointments'])->name('afspraken.GetAppointments');
Route::get('/getincidents/{id}',[IncidentController::class,'getIncidents'])->name('/getincidents.getIncidents');
Route::get('/getpatients/{id}',[PatientController::class,'getPatients'])->name('patientinfo.getPatients');

Route::patch('/updatepatients/{id}',[PatientController::class,'updatePatients'])->name('patientinfo.updatePatients');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
