import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() 
{
  try 
  {
    revalidatePath("/");
    console.log("Revalidation triggered for path: /");
    return NextResponse.json({ message: "Revalidation triggered successfully" });
  } 
  catch (error) 
  {
    console.error("Error in revalidation:", error);
    return NextResponse.json({ error: "Failed to trigger revalidation" },{ status: 500 });
  }
}