'use client';

import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/cron/fetch-data?secret=R1220K5');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setMessage(result.message);
      setData(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cron Job Data Fetcher</h1>

      {/* Button to Fetch Data */}
      <button
        onClick={fetchData}
        disabled={loading}
        className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Fetching...' : 'Fetch Data'}
      </button>

      {/* Display Message */}
      {message && (
        <p className="mt-4 text-green-600 font-medium">{message}</p>
      )}

      {/* Display Error */}
      {error && (
        <p className="mt-4 text-red-600 font-medium">{error}</p>
      )}

      {/* Display Data in a Table */}
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