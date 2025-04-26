'use client';

import { useState } from 'react';

export default function RevalidateButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRevalidate = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await fetch('/api/revalidate', { method: 'POST' });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to trigger revalidation');
      }

      setMessage(result.message);
      window.location.reload(); // Reload to show updated data
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