<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\ShuttleForm;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // User registration
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => $data['role'],
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
            'role' => $user->role
        ]);
    }

    // User login
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
            'role' => $user->role
        ]);
    }

    // User logout
    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    // Get authenticated user details
    public function me(Request $request)
    {
        return $request->user();
    }

    public function getUser(Request $request)
    {
        try {
            // Get the search query from the request
            $searchQuery = $request->query('q');

            // Query users based on the search query
            $users = User::where('name', 'like', '%' . $searchQuery . '%')
                ->orWhere('email', 'like', '%' . $searchQuery . '%')
                ->get();

            // Return JSON response with filtered user details
            return response()->json($users);
        } catch (\Exception $e) {
            // Handle exceptions (e.g., database error) and return error response
            return response()->json(['error' => 'Failed to fetch users'], 500);
        }
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function getDashboardData()
    {
        $shuttleCount = ShuttleForm::count();
        $onServiceCount = ShuttleForm::where('working_condition', 'Available')->count();
        $onStandCount = ShuttleForm::where('working_condition', 'Under Maintenance')->count();
        $registeredDriversCount = User::where('role', '3')->count();
        $registeredStudentsCount = User::where('role', '2')->count();

        return response()->json([
            'registeredDriversCount' => $registeredDriversCount,
            'registeredStudentsCount' => $registeredStudentsCount,
            'shuttleCount' => $shuttleCount,
            'onServiceCount' => $onServiceCount,
            'onStandCount' => $onStandCount,
        ], 200);
    }
}
