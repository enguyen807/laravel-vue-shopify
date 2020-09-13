<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Config;


class ApiController extends Controller
{
    // REFACTOR LATER to use only 1 endpoint
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createCustomer(Request $request)
    {   
        $formDataQuery = $request->input('query');
        $url = config('shopify.storefront_url');
        $token = config('shopify.storefront_token');
        
        $response = HTTP::withoutVerifying()->
            withHeaders(['X-Shopify-Storefront-Access-Token' => $token])->
            post($url, ['query' => $formDataQuery]);

        $response->throw();

        return $response->body();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createToken(Request $request)
    {   
        $formDataQuery = $request->input('query');
        $url = config('shopify.storefront_url');
        $token = config('shopify.storefront_token');
        
        $response = HTTP::withoutVerifying()->
            withHeaders(['X-Shopify-Storefront-Access-Token' => $token])->
            post($url, ['query' => $formDataQuery]);

        $response->throw();
        $response->successful();

        return $response->body();
    }    
}
