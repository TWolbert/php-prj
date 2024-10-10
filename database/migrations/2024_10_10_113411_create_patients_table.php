<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // protected $fillable = [
        //     'firstname',
        //     'lastname',
        //     'is_dead',
        //     'is_extern',
        //     'birth_date',
        //     'doctor_id',
        //     'address_id',
        //     'extra_id',
        //     'rooom_id',
        //     'doctor_id',
        // ];
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->boolean('is_dead');
            $table->boolean('is_extern');
            $table->date('birth_date');
            $table->integer('doctor_id');
            $table->integer('address_id');
            $table->integer('extra_id');
            $table->integer('room_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
