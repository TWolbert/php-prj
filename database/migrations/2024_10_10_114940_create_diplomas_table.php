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
        //     'doctor_id',
        //     'diploma_name',
        //     'school',
        // ];
        Schema::create('diplomas', function (Blueprint $table) {
            $table->id();
            $table->integer('doctor_id');
            $table->string('diploma_name');
            $table->string('school');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diplomas');
    }
};
