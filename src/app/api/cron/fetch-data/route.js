import { NextResponse } from "next/server";

export async function GET(request) 
{
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  console.log("Received secret:", secret);
  console.log("Expected CRON_SECRET_KEY:", process.env.CRON_SECRET_KEY);

  if (secret !== process.env.CRON_SECRET_KEY)
  {
    console.log("Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try 
  {
    const response = await fetch("https://cron-job-vercel-gamma.vercel.app/api/cron/fetch-data?secret=R1220K5",
    {
      next: { revalidate: 3600 },  
    });

    const data = await response.json();
    console.log(data);
    console.log("Cron Job Executed! Fetched Data:", data.slice(0, 10));

    return NextResponse.json({ message: "Cron job executed successfully!", data: data.slice(0, 10),  });
  } 
  catch (error) 
  {
    console.error("Error in cron job:", error);
    return NextResponse.json({ error: "Failed to execute cron job" },{ status: 500 });
  }
}