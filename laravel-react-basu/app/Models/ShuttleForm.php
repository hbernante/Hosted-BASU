<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShuttleForm extends Model
{
    use HasFactory;

    protected $table = 'shuttle_form';

    protected $fillable = [
        'shuttle_name',
        'shuttle_plate_number',
        'shuttle_color',
        'shuttle_landmark',
        'passenger_capacity',
        'working_condition',
        'png_file',
        'jpg_file',
    ];
}
