<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\ShuttleForm;
use App\Models\User;

class ReservationController extends Controller
{
    public function get()
    {
        // Retrieve all reservations
        $reservations = Reservation::all();
        return response()->json($reservations);
    }

    public function create(Request $request)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'passengers' => 'required|array', // Expecting an array of passenger IDs
            'reason' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'landmark' => 'required|string',
            'status' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
        ]);

        // Create new reservation
        $reservation = Reservation::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'reason' => $validatedData['reason'],
            'description' => $validatedData['description'],
            'location' => $validatedData['location'],
            'landmark' => $validatedData['landmark'],
            'status' => $validatedData['status'],
            'start_time' => $validatedData['start_time'],
            'end_time' => $validatedData['end_time'],
        ]);

        // Extract passenger IDs
        $passengerIds = collect($validatedData['passengers'])->pluck('id')->toArray();

        // Associate passengers with the reservation
        $reservation->passengers()->attach($passengerIds);

        return response()->json($reservation, 201);
    }




    public function show($id)
    {
        // Find reservation by ID
        $reservation = Reservation::findOrFail($id);

        // Load passengers associated with the reservation
        $passengers = $reservation->passengers()->select('id', 'name', 'email')->get();

        return response()->json([
            'reservation' => $reservation,
            'passengers' => $passengers
        ]);
    }



    public function update(Request $request, $id)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'reason' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'landmark' => 'required|string',
            'status' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
            'shuttle' => 'nullable|string', // Ensure the provided shuttle ID exists in the shuttle_forms table
        ]);

        // Find reservation by ID
        $reservation = Reservation::findOrFail($id);

        // Update reservation fields
        $reservation->update($validatedData);

        // If shuttle field is provided, associate the reservation with the shuttle form
        if ($request->has('shuttle')) {
            // Find shuttle form by ID
            $shuttleForm = ShuttleForm::find($validatedData['shuttle']);
            if ($shuttleForm) {
                // Associate reservation with shuttle form
                $reservation->shuttleForm()->associate($shuttleForm);
            }
        }

        // Save changes
        $reservation->save();

        return response()->json($reservation, 200);
    }

    public function delete($id)
    {
        // Find reservation by ID and delete
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json(null, 204);
    }
}
