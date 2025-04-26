'use client';

import { useState } from 'react';

export default function RevalidateButton({ onDataFetched }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRevalidate = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      // Trigger revalidation
      const revalidateResponse = await fetch('/api/revalidate', { method: 'POST' });
      const revalidateResult = await revalidateResponse.json();

      if (!revalidateResponse.ok) {
        throw new Error(revalidateResult.error || 'Failed to trigger revalidation');
      }

      setMessage(revalidateResult.message);

      // Fetch fresh data client-side
      const dataResponse = await fetch('/api/cron/fetch-data?secret=R1220K5');
      const dataResult = await dataResponse.json();

      if (!dataResponse.ok) {
        throw new Error(dataResult.error || 'Failed to fetch data');
      }

      // Pass the fetched data to the parent component
      onDataFetched(dataResult.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleRevalidate}
        disabled={loading}
        className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Revalidating...' : 'Refresh Data'}
      </button>
      {message && (
        <p className="mt-4 text-green-600 font-medium">{message}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}