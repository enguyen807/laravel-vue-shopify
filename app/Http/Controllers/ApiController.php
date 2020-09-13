<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Config;


class ApiController extends Controller
{
    // REFACTOR LATER to use only 1 endpoint
    public function createCustomer(Request $request)
    {   
        $formDataQuery = $request->input('query');
        $url = config('shopify.storefront_url');
        $token = config('shopify.storefront_token');
        
        $response = HTTP::withoutVerifying()->
            withHeaders(['X-Shopify-Storefront-Access-Token' => $token])->
            post($url, ['query' => $formDataQuery]);

        echo $response->body();
    }

    public function createToken(Request $request)
    {   
        $formDataQuery = $request->input('query');
        $url = config('shopify.storefront_url');
        $token = config('shopify.storefront_token');
        
        $response = HTTP::withoutVerifying()->
            withHeaders(['X-Shopify-Storefront-Access-Token' => $token])->
            post($url, ['query' => $formDataQuery]);

        echo $response->body();
    }    
}
