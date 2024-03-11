<?php

use App\Models\User;
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
        Schema::create('shuttle_form', function (Blueprint $table) {
            $table->id();
            $table->string('shuttle_name');
            $table->string('shuttle_plate_number');
            $table->string("shuttle_color");
            $table->string('shuttle_landmark');
            $table->string('passenger_capacity');
            $table->string('working_condition');
            $table->string('png_file')->nullable(); // Column for PNG file
            $table->string('jpg_file')->nullable(); // Column for JPG file
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shuttle_form');
    }
};
