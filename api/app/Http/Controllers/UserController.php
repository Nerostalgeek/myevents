<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{

    public function store(Requests\CreateUserRequest $request)
    {
        $input = Input::all();

        if (!User::hasAlreadyRegister(Input::get('facebook_id')))
        {
            $user = User::create($input);
        }
        else
        {
            $user = User::where('facebook_id', '=', Input::get('facebook_id'))->firstOrFail();
        }

        return Response::json($user, 200, [], JSON_NUMERIC_CHECK);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return Response::json($user, 200, [], JSON_NUMERIC_CHECK);
    }
}