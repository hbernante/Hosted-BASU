<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function show(Request $request)
    {

        $user = $request->user();
        $user->load('driver');

        return $user;
    }

    public function update(Request $request)
    {

        $request->validate([
            'shuttle' => 'required',
            'license_plate' => 'required',
            'color' => 'required',
            'model' => 'required',
            'name' => 'required',

        ]);

        $user = $request->user();

        $user->update($request->only('name'));

        $user->driver()->updateOrCreate($request->only([

            'shuttle',
            'license_plate',
            'color',
            'model',
        ]));

        $user->load('driver');

        return $user;
    }
}

