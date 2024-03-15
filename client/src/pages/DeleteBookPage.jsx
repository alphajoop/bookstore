import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bookApi from '../api/bookApi';
import Spinner from '../components/Spinner';
import useAsyncState from '../utils/hooks/useAsyncState';

export default function DeleteBookPage() {
  const { id } = useParams();
  const history = useNavigate();

  const { loading, setLoading, error, setError } = useAsyncState();

  useEffect(() => {
    async function deleteBook() {
      setLoading(true);
      try {
        await bookApi.deleteBook(id);
        setLoading(false);
        history('/');
      } catch (error) {
        console.error('Error deleting book:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError('Failed to delete book.');
        }
      } finally {
        setLoading(false);
      }
    }

    deleteBook();
  }, [id, history, setError, setLoading]);

  return (
    <div>
      {loading ? <Spinner /> : error ? <div>Error: {error}</div> : null}
    </div>
  );
}
