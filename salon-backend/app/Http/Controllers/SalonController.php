<?php
// app/Http/Controllers/SalonController.php

namespace App\Http\Controllers;

use App\Models\Salon;
use Illuminate\Http\Request;

class SalonController extends Controller
{
    // ============================================
    // GET ALL SALONS
    // GET /api/salons?city=Fes&type=Femme&search=najat
    // ============================================
    public function index(Request $request)
    {
        $query = Salon::with('services');

        // Filter by city
        if ($request->city && $request->city !== 'Toutes') {
            $query->where('city', $request->city);
        }

        // Filter by type
        if ($request->type && $request->type !== 'Tous') {
            $query->where('type', $request->type);
        }

        // Search by name
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $salons = $query->get();

        return response()->json($salons);
    }

    // ============================================
    // GET ONE SALON
    // GET /api/salons/{id}
    // ============================================
    public function show($id)
    {
        $salon = Salon::with('services')->find($id);

        if (!$salon) {
            return response()->json(['message' => 'Salon introuvable'], 404);
        }

        return response()->json($salon);
    }

    // ============================================
    // CREATE SALON
    // POST /api/salons
    // Body: { name, city, type, description, address, phone, hours, image, services[] }
    // ============================================
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string',
            'city'        => 'required|string',
            'type'        => 'required|in:Femme,Homme,Spa',
            'description' => 'nullable|string',
            'address'     => 'nullable|string',
            'phone'       => 'nullable|string',
            'hours'       => 'nullable|string',
            'image'       => 'nullable|string',
        ]);

        $salon = Salon::create([
            'owner_id'    => $request->user()->id,
            'name'        => $request->name,
            'city'        => $request->city,
            'type'        => $request->type,
            'description' => $request->description,
            'address'     => $request->address,
            'phone'       => $request->phone,
            'hours'       => $request->hours,
            'image'       => $request->image,
        ]);

        // Save services if provided
        if ($request->services) {
            foreach ($request->services as $service) {
                $salon->services()->create([
                    'name'     => $service['name'],
                    'price'    => $service['price'],
                    'duration' => $service['duration'],
                ]);
            }
        }

        return response()->json($salon->load('services'), 201);
    }

    // ============================================
    // UPDATE SALON
    // PUT /api/salons/{id}
    // ============================================
    public function update(Request $request, $id)
    {
        $salon = Salon::find($id);

        if (!$salon || $salon->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $salon->update($request->only([
            'name', 'city', 'type', 'description',
            'address', 'phone', 'hours', 'image'
        ]));

        return response()->json($salon->load('services'));
    }

    // ============================================
    // DELETE SALON
    // DELETE /api/salons/{id}
    // ============================================
    public function destroy(Request $request, $id)
    {
        $salon = Salon::find($id);
        $user  = $request->user();

        // Only owner or admin can delete
        if (!$salon || ($salon->owner_id !== $user->id && $user->role !== 'admin')) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $salon->delete();

        return response()->json(['message' => 'Salon supprimé']);
    }
}