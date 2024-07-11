<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers() {

        $tasks = DB::table('users')->get();
        
        return response()->json($tasks, 200);
    }
}
