import { NextResponse } from "next/server";

export async function GET(request) {
  // Extract the 'secret' query parameter from the URL
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Check if the secret matches the CRON_SECRET_KEY from environment variables
  if (secret !== process.env.CRON_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch data from a dummy API (JSONPlaceholder)
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Log the fetched data (you can save to a database here)
    console.log("Cron Job Executed! Fetched Data:", data.slice(0, 2));

    return NextResponse.json({
      message: "Cron job executed successfully!",
      data: data.slice(0, 1),
    });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json(
      { error: "Failed to execute cron job" },
      { status: 500 }
    );
  }
}