<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $casts =[
        'origin' => 'array',
        'destination' => 'array',
        'driver_location' => 'array',
        'is_started' => 'boolean',
        'is_complete' => 'boolean',
    ];

    protected $guarded = [];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function driver(){
        return $this->belongsTo(Driver::class);
    }

}
