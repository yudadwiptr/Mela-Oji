import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Wish from "@/lib/models/Wish";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  let limit = parseInt(searchParams.get("limit") || "5", 10);
  
  // For export functionality - if limit is very large, it's for export
  const isExport = limit > 100;

  try {
    await connectToDatabase();

    // Fetch paginated wishes
    const wishes = await Wish.find()
      .sort({ createdAt: -1 })
      .skip(isExport ? 0 : (page - 1) * limit)
      .limit(limit);

    const totalWishes = await Wish.countDocuments();

    return NextResponse.json({
      success: true,
      wishes,
      totalPages: Math.ceil(totalWishes / limit),
      currentPage: page,
      totalWishes,
    });
  } catch (error) {
    console.error("Error fetching wishes:", error);
    
    // Log more detailed error information
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    
    if (error instanceof Error && error.message.includes("Database connection error")) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Tidak dapat terhubung ke database",
          details: `MongoDB connection error: ${error.message}`
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Gagal mengambil data ucapan",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
