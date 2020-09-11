<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */ 
    protected $fillable = ['name'];

    /**
     * A tag can has many products
     *
     * 
     */ 
    public function products() {
        return $this->hasMany(Product::class);
    }
}
