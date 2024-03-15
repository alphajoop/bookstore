import { useState } from 'react';

export default function useAsyncState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const clearError = () => setError(null);
  const clearSuccessMessage = () => setSuccessMessage('');

  return {
    loading,
    setLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
    clearError,
    clearSuccessMessage,
  };
}
