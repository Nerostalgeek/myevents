<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password', 'facebook_id', 'firstname', 'lastname', 'email', 'birthday', 'bio', 'photo_url'

    ];

    public static function hasAlreadyRegister($id_facebook)
    {
        return self::where(['facebook_id' => $id_facebook])->exists();
    }
}
