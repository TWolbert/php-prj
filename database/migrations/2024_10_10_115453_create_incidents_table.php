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
        //     'date',
        //     'sort_injury',
        //     'patient_id',
        // ];
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('sort_injury');
            $table->integer('patient_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};
