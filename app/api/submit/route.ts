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
  } catch (error: any) {
    // Log the error with details
    console.error("Error submitting wish:", error);
    console.error("Error details:", JSON.stringify({
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    }));
    
    // Return appropriate error response
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: "Data tidak valid", details: error.message },
        { status: 400 }
      );
    }
    
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Anda sudah mengirimkan ucapan sebelumnya" },
        { status: 409 }
      );
    }
    
    if (error.message && error.message.includes("Database connection error")) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Tidak dapat terhubung ke database, silakan coba lagi",
          details: `Error connecting to MongoDB: ${error.message}`
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Gagal mengirim ucapan, silakan coba lagi nanti",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Optional: Handler untuk method yang tidak diizinkan
export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
