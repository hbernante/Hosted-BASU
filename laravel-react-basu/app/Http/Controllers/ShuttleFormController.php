<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ShuttleForm;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ShuttleFormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shuttleForms = ShuttleForm::all();
        return view('shuttle_forms.index', compact('shuttleForms'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('shuttle_forms.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'shuttle_name' => 'required',
            'shuttle_plate_number' => 'required',
            'shuttle_color' => 'required',
            'shuttle_landmark' => 'required',
            'passenger_capacity' => 'required',
            'working_condition' => 'required',
            'png_file' => '|image|mimes:png,jpg,jpeg|max:2048',
            'jpg_file' => '|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        $shuttleForms = ShuttleForm::create($validatedData);

        return response()->json(['success' => true, 'message' => 'Shuttle form created successfully.'], 200);
    }

    // Other methods like show, edit, update, destroy can also be added based on your requirements

    /**
     * Retrieve all shuttle forms.
     *
     * @return \Illuminate\Http\Response
     */
    public function get(Request $request)
    {
        $shuttleForms = ShuttleForm::all();
        return response()->json(['success' => true, 'data' => $shuttleForms], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        try {
            $shuttleForms = ShuttleForm::findOrFail($id);
            $shuttleForms->delete();
            return response()->json(['success' => true, 'message' => 'Shuttle form deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to delete shuttle form.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
