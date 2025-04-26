// import { NextResponse } from "next/server";

// export async function GET(request) 
// {

//   const { searchParams } = new URL(request.url);
//   const secret = searchParams.get("secret");

//   if (secret !== process.env.CRON_SECRET_KEY) 
//   {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try 
//   {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await response.json();

//     console.log("Cron Job Executed! Fetched Data:", data.slice(0, 2));

//     return NextResponse.json({
//       message: "Cron job executed successfully!",
//       data: data.slice(0, 10),
//     });
//   } 
//   catch (error) 
//   {
//     console.error("Error in cron job:", error);
//     return NextResponse.json(
//       { error: "Failed to execute cron job" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch data with caching and revalidation
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 3600 }, // Cache for 1 hour, then revalidate
    });

    const data = await response.json();
    console.log("Cron Job Executed! Fetched Data:", data.slice(0, 2));

    return NextResponse.json({
      message: "Cron job executed successfully!",
      data: data.slice(0, 2),
    });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json(
      { error: "Failed to execute cron job" },
      { status: 500 }
    );
  }
}