<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getSession(Request $request, $token) {


        $value = $request->session()->get('key');
    }

    public function storeSession(Request $request) {
        $request->session()->put('key', 'value');
    }

}
