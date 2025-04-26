import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Revalidate the homepage
    revalidatePath("/");
    return NextResponse.json({ message: "Revalidation triggered successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to trigger revalidation" },
      { status: 500 }
    );
  }
}