<?php
// app/Http/Controllers/BookingController.php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    // ============================================
    // GET BOOKINGS
    // GET /api/bookings
    // client → bookings ديالو
    // owner  → bookings ديال سالونو
    // admin  → كل bookings
    // ============================================
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'client') {
            $bookings = Booking::with(['salon', 'service'])
                ->where('client_id', $user->id)
                ->orderBy('date', 'desc')
                ->get();

        } elseif ($user->role === 'owner') {
            // Get salon IDs owned by this user
            $salonIds = $user->salons->pluck('id');
            $bookings = Booking::with(['salon', 'service', 'client'])
                ->whereIn('salon_id', $salonIds)
                ->orderBy('date', 'desc')
                ->get();

        } elseif ($user->role === 'admin') {
            $bookings = Booking::with(['salon', 'service', 'client'])
                ->orderBy('date', 'desc')
                ->get();

        } else {
            return response()->json([]);
        }

        return response()->json($bookings);
    }

    // ============================================
    // CREATE BOOKING
    // POST /api/bookings
    // Body: { salon_id, service_id, date, time }
    // ============================================
    public function store(Request $request)
    {
        $request->validate([
            'salon_id'   => 'required|exists:salons,id',
            'service_id' => 'required|exists:services,id',
            'date'       => 'required|date|after_or_equal:today',
            'time'       => 'required|string',
        ]);

        $booking = Booking::create([
            'client_id'  => $request->user()->id,
            'salon_id'   => $request->salon_id,
            'service_id' => $request->service_id,
            'date'       => $request->date,
            'time'       => $request->time,
            'status'     => 'pending',
            'notes'      => $request->notes,
        ]);

        return response()->json($booking->load(['salon', 'service']), 201);
    }

    // ============================================
    // UPDATE BOOKING STATUS
    // PUT /api/bookings/{id}
    // Body: { status: 'confirmed' | 'cancelled' | 'done' }
    // ============================================
    public function update(Request $request, $id)
    {
        $booking = Booking::find($id);
        $user    = $request->user();

        if (!$booking) {
            return response()->json(['message' => 'Réservation introuvable'], 404);
        }

        // Client can only cancel their own booking
        if ($user->role === 'client' && $booking->client_id !== $user->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $booking->update([
            'status' => $request->status
        ]);

        return response()->json($booking->load(['salon', 'service']));
    }

    // ============================================
    // DELETE BOOKING
    // DELETE /api/bookings/{id}
    // ============================================
    public function destroy(Request $request, $id)
    {
        $booking = Booking::find($id);

        if (!$booking || $booking->client_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $booking->delete();

        return response()->json(['message' => 'Réservation supprimée']);
    }
}