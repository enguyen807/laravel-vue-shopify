@extends('layouts.app')

@section('content')
<register-component csrf="{{csrf_token()}}"></register-component>
@endsection
