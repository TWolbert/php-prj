<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\BillingsController;
use App\Http\Controllers\DoctorsController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\IncidentsController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomsController;
use App\Http\Controllers\WaitingListController;
use App\Models\Appointment;
use App\Models\appointments;
use App\Models\archive;
use App\models\Billings;
use App\Models\doctors;
use App\Models\Incident;
use App\Models\incidents;
use App\Models\Patient;
use App\Models\rooms;
use App\Models\waitinglist;
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


Route::get('/patients/{id}',function($id){
    $isArchived = archive::where('patient_id',$id)->exists();
    return Inertia::render('Patientinfo',[
        'patient' => Patient::findOrFail($id),
        'doctors' => doctors::all(),
        'rooms' => rooms::all(),	
        'incidents' => incidents::where('patient_id',$id)->get(),
        'isArchived' => $isArchived
    ]);
})->name('patientinfo');

// /parients/archive route POST that takes the following arguments ID, isDead, isArchived
Route::post('/patients/archive', [PatientsController::class, 'archive'])->name('patients.archive'); 

Route::get('/patients',function(){
    // Get all patients that don't appear in the archive table
    $archivedPatients = archive::all()->pluck('patient_id');
    $patients = Patient::whereNotIn('id', $archivedPatients)->get();


    return Inertia::render('Patients',[
        'patients' => $patients,
    ]);
})->middleware(['auth', 'verified'])->name('patients');

Route::get('/patients/create',function(){
    return Inertia::render('PatientCreate', [
        'doctors' => doctors::all(),
        'rooms' => rooms::all(),
        'waitinglist' => waitinglist::all()
    ]);
})->middleware(['auth', 'verified'])->name('patientcreate');

Route::post('/patients',action: [PatientsController::class, 'store'])->name('patientcreate.createPatient');

Route::get('/voorvallen',function(){
    return Inertia::render('Voorvallen');
})->name('voorvallen');

Route::get('/incidents',function(){
    return Inertia::render('Incidenten',[
        'incident' =>Incidents::all(),
        'patients' => Patient::all()
    ]);
})->middleware(['auth', 'verified'])->name('incidenten');


Route::get('/wachtlijst',function(){
    return Inertia::render('WaitingList',[
        'list' =>waitinglist::select('name','email')->get()
    ]);
})->middleware(['auth', 'verified'])->name('waitinglist');

Route::get("/financien",function(){
    return Inertia::render('Finance',[
        'patients' => Patient::all(),
        'rooms' => rooms::all()
    ]);
})->middleware(['auth', 'verified'])->name('finance');

Route::get('/afspraak',function(){
    return Inertia::render('Appointment');
})->middleware(['auth', 'verified'])->name('appointment');

Route::get('/archief',function(){
    return Inertia::render('Archive',[
        'archivedPatients' => archive::all()
    ]);
})->middleware(['auth', 'verified'])->name('archive');

Route::get('/doctor/create',function(){
    return Inertia::render('DoctorCreate');
})->middleware(['auth', 'verified'])->name('doctormaken');

Route::get('/room/create',function(){
    return Inertia::render('RoomCreate');
})->middleware(['auth', 'verified'])->name('kamermaken');

//Route::post('/afspraken',[AppointmentController::class,'CreateAppointment'])->name('afspraken.CreateAppointment');
//Route::get('/getappointments', [AppointmentController::class,'GetAppointments'])->name('afspraken.GetAppointments');
//Route::get('/getincidents/{id}',[IncidentController::class,'getIncidents'])->name('/getincidents.getIncidents');

//Route::get('/getpatients/{id}',[PatientController::class,'getPatients'])->name('patientinfo.getPatients');

// Tie Doctor controller to /doctor using resource
Route::resource('doctors', DoctorsController::class)->middleware(['auth', 'verified']); 
Route::resource('rooms', RoomsController::class)->middleware(['auth', 'verified']);
Route::resource('incident', IncidentsController::class)->middleware(['auth', 'verified']);
Route::resource('waitinglist', WaitingListController::class)->middleware(['auth', 'verified']);
Route::resource('patient', controller: PatientsController::class)->middleware(['auth', 'verified']);
Route::resource('Billings',BillingsController::class)->middleware(['auth', 'verified']);
Route::resource('appointments',AppointmentsController::class)->middleware(['auth', 'verified']);
//Route::patch('/updatepatients/{id}',[PatientController::class,'updatePatients'])->name('patientinfo.updatePatients');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
