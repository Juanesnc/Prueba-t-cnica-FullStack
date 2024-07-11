<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Support\Str;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    
    public function index($id, Request $request)
    {

        $query = DB::table('tasks')->where('user_id', $id);

        if($request->filled('name')){
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }
        
        $tasks = $query->get();
        
        return response()->json($tasks, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $uuid = Str::uuid();

        $task = new Task;
        $task->id = $uuid;
        $task->user_id = Auth::user()->id;
        $task->name = $request->name;
        $task->responsible = $request->responsible;
        $task->status = "pending";
        $task->save();
        return response()->json(['message' => 'Success'], 200);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = DB::table('tasks')
        ->where('id', $id)
        ->update([
            'name' => $request->name,
            'responsible' => $request->responsible,
            'status' => $request->status,
            'updated_at' => now()
        ]);
        
        return response()->json(['message' => 'Success'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = DB::table('tasks')
        ->where('id', $id)
        ->delete();

        return response()->json(['Task Deleted' => 'Success'], 200);
    }
}
