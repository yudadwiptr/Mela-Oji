// app/api/get/route.ts (atau file route kamu yang lain)
export const runtime = "nodejs";       // paksa Node.js (bukan Edge)
export const dynamic = "force-dynamic"; // hindari cache untuk request DB

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Wish from "@/lib/models/Wish";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json().catch(error => {
      console.error("Error parsing request body:", error);
      return null;
    });
    
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }
    
    const { name, attendance, guests, message } = body;
    
    // Validate required fields
    if (!name || !attendance || guests === undefined || !message) {
      return NextResponse.json(
        { success: false, message: "Semua kolom harus diisi" },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectToDatabase();
    
    // Create the wish in the database
    const newWish = await Wish.create({ 
      name, 
      attendance, 
      guests: Number(guests), 
      message 
    });
    
    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Ucapan berhasil dikirim",
        wish: {
          id: newWish._id,
          name,
          attendance,
          guests,
          message,
          createdAt: newWish.createdAt
        }
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Log the error with details
    console.error("Error submitting wish:", error);
    if (error && typeof error === 'object' && 'name' in error && 'message' in error) {
      if (error instanceof Error) {
        console.error("Error details:", JSON.stringify({
          name: error.name,
          message: error.message,
          code: (error as { code?: number }).code,
          stack: error.stack
        }));
      } else {
        console.error("Error details:", error);
      }
    } else {
      console.error("Error details:", error);
    }
    
    // Return appropriate error response
    if (error && typeof error === 'object' && 'name' in error && (error as { name?: string }).name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: "Data tidak valid", details: (error as { message?: string }).message },
        { status: 400 }
      );
    }
    
    if (error && typeof error === 'object' && 'name' in error && 'code' in error && (error as { name?: string, code?: number }).name === 'MongoServerError' && (error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { success: false, message: "Anda sudah mengirimkan ucapan sebelumnya" },
        { status: 409 }
      );
    }
    
    if (error && typeof error === 'object' && 'message' in error && typeof (error as { message?: string }).message === 'string' && (error as { message?: string }).message?.includes("Database connection error")) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Tidak dapat terhubung ke database, silakan coba lagi",
          details: `Error connecting to MongoDB: ${(error as { message?: string }).message}`
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Gagal mengirim ucapan, silakan coba lagi nanti",
        details: (error && typeof error === 'object' && 'message' in error) ? (error as { message?: string }).message : String(error) || "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Optional: Handler untuk method yang tidak diizinkan
export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
