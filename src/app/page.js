import RevalidateButton from "../components/RevalidateButton";

export const revalidate = 3600;

async function fetchData() {
  const url = `/api/cron/fetch-data?secret=${process.env.CRON_SECRET_KEY}`;

  console.log("Fetching data from URL:", url);

  try {
    const response = await fetch(url, {
      next: { revalidate: 0 }, // Force revalidation on each fetch
    });
    console.log("Fetch response status:", response.status);
    console.log("Fetch response ok:", response.ok);

    const result = await response.json();
    console.log("Fetch result:", result);

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch data");
    }

    return result;
  } catch (error) {
    console.error("Error in fetchData:", error.message);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

export default async function Home() {
  let data = [];
  let message = "";
  let error = "";

  try {
    const result = await fetchData();
    message = result.message;
    data = result.data || [];
    console.log("Data fetched successfully:", data);
  } catch (err) {
    error = err.message;
    console.error("Error in Home component:", error);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cron Job Data Fetcher</h1>

      <RevalidateButton />

      {message && (
        <p className="mt-4 text-green-600 font-medium">{message}</p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-medium">{error}</p>
      )}

      {data.length > 0 && (
        <div className="mt-6 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Fetched Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Body</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data.map((post) => (
                  <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{post.id}</td>
                    <td className="py-3 px-6 text-left">{post.title}</td>
                    <td className="py-3 px-6 text-left">{post.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}