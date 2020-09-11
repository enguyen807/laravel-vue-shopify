<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */    
    protected $fillable = [
        'name', 'description', 'price', 'image', 'units', 'tag_id'
    ];

    public function orders() {
        return $this->hasMany(Order::class);
    }

    public function tags() {
        return $this->hasOne(Tag::class);
    }
}
