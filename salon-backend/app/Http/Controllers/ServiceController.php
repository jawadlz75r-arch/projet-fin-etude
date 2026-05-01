<?php
// app/Http/Controllers/ServiceController.php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Salon;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // ============================================
    // CREATE SERVICE
    // POST /api/services
    // Body: { salon_id, name, price, duration }
    // ============================================
    public function store(Request $request)
    {
        $request->validate([
            'salon_id' => 'required|exists:salons,id',
            'name'     => 'required|string',
            'price'    => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
        ]);

        // Check if user owns the salon
        $salon = Salon::find($request->salon_id);
        if ($salon->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $service = Service::create([
            'salon_id' => $request->salon_id,
            'name'     => $request->name,
            'price'    => $request->price,
            'duration' => $request->duration,
        ]);

        return response()->json($service, 201);
    }

    // ============================================
    // UPDATE SERVICE
    // PUT /api/services/{id}
    // ============================================
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service introuvable'], 404);
        }

        // Check ownership
        if ($service->salon->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $service->update($request->only(['name', 'price', 'duration']));

        return response()->json($service);
    }

    // ============================================
    // DELETE SERVICE
    // DELETE /api/services/{id}
    // ============================================
    public function destroy(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service || $service->salon->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $service->delete();

        return response()->json(['message' => 'Service supprimé']);
    }
}