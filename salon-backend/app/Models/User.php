<?php
// ============================================
// app/Models/User.php
// ============================================

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'phone'
    ];

    protected $hidden = [
        'password'
    ];

    // User has many salons (owner)
    public function salons()
    {
        return $this->hasMany(Salon::class, 'owner_id');
    }

    // User has many bookings (client)
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'client_id');
    }
}


// ============================================
// app/Models/Salon.php
// ============================================

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    protected $fillable = [
        'owner_id', 'name', 'city', 'type',
        'description', 'address', 'phone',
        'hours', 'image', 'rating', 'reviews'
    ];

    // Salon belongs to owner (user)
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    // Salon has many services
    public function services()
    {
        return $this->hasMany(Service::class);
    }

    // Salon has many bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}


// ============================================
// app/Models/Service.php
// ============================================

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'salon_id', 'name', 'price', 'duration'
    ];

    // Service belongs to salon
    public function salon()
    {
        return $this->belongsTo(Salon::class);
    }
}


// ============================================
// app/Models/Booking.php
// ============================================

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'client_id', 'salon_id', 'service_id',
        'date', 'time', 'status', 'notes'
    ];

    // Booking belongs to client
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    // Booking belongs to salon
    public function salon()
    {
        return $this->belongsTo(Salon::class);
    }

    // Booking belongs to service
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}