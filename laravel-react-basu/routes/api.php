<?php

use App\Events\SendLocation;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ShuttleFormController;
use App\Http\Controllers\TripController;
use App\Models\ShuttleForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


//Public Routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);


//Protected Routes
Route::middleware('auth:sanctum')->group(function () {

    //Credential Authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    //Driver Accounts
    Route::get('/driver', [DriverController::class, 'show']);
    Route::post('/driver', [DriverController::class, 'update']);

    //Location Tracking
    Route::post('trip', [TripController::class, 'store']);
    Route::get('trip/{trip}', [TripController::class, 'show']);
    Route::post('trip/{trip}/accept', [TripController::class, 'accept']);
    Route::post('trip/{trip}/start', [TripController::class, 'start']);
    Route::post('trip/{trip}/end', [TripController::class, 'end']);
    Route::post('trip/{trip}/location', [TripController::class, 'location']);

    //Live Tracking:
    Route::post('/map', function (Request $request) {
        $lat = $request->input('lat');
        $long = $request->input('long');
        $location = ["lat" => $lat, "long" => $long];
        event(new SendLocation($location));
        return response()->json(['status' => 'success', 'data' => $location]);
    });

    //Account Registration
    Route::post('/account/register', [AuthController::class, 'register']);
    Route::get('/users', [AuthController::class, 'getUser']);
    Route::delete('/users/{id}', [AuthController::class, 'deleteUser']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //Routes for Shuttle Storage
    Route::post('/shuttle/form', [ShuttleFormController::class, 'store']);
    Route::get('/shuttle/storage', [ShuttleFormController::class, 'get']);
    Route::delete('/shuttle/storage/{id}', [ShuttleFormController::class, 'delete']);

    //Reservation Controller
    Route::get('/reservation', [ReservationController::class, 'get']);
    Route::put('/reservation/{id}', [ReservationController::class, 'update']);
    Route::delete('/inquire/reservation/{id}', [ReservationController::class, 'delete']);
    Route::get('/student/reservation/list', [ReservationController::class, 'get']);
    Route::post('/inquire/reservation', [ReservationController::class, 'create']);
    Route::get('/inquire/reservation/{id}', [ReservationController::class, 'show']);

    //Routes for Dashboard
    Route::get('/dashboard', [AuthController::class, 'getDashboardData']);
});
