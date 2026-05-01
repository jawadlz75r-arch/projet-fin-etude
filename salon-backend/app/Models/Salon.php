<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'address',
        'city',
        'phone',
        'image',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Le propriétaire du salon
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Les services proposés par ce salon
    public function services()
    {
        return $this->hasMany(Service::class);
    }

    // Les réservations de ce salon
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}


