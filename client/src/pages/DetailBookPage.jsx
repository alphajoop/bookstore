import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookApi from '../api/bookApi';
import DetailIcon from '../assets/icons/DetailIcon';
import { EditIcon } from '../assets/icons/EditIcon';
import TrashIcon from '../assets/icons/TrashIcon';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import useAsyncState from '../utils/hooks/useAsyncState';

function DetailBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { loading, setLoading, error, setError } = useAsyncState();

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const fetchedBook = await bookApi.getBookById(id);
        setBook(fetchedBook);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError('Failed to fetch book details.');
        }
        setLoading(false);
      }
    }

    fetchBook();
  }, [id, setError, setLoading]);

  return (
    <div className="my-0 mx-auto max-w-full p-10">
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="w-full overflow-auto rounded border">
          <div className="flex justify-between items-center p-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Book Details</h1>
          </div>
          <div className="overflow-x-auto p-4">
            <div className="flex justify-center items-center">
              <div className="max-w-3xl w-full">
                {book && (
                  <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">{book.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      Publish Year: {book.publishYear}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Description: Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Nulla convallis libero at nunc ultricies,
                      nec ultricies nunc dignissim.
                    </p>
                    <div className="flex justify-end gap-4">
                      <button className="flex items-center text-gray-500">
                        <DetailIcon />
                      </button>
                      <button className="flex items-center text-gray-500">
                        <EditIcon />
                      </button>
                      <button className="flex items-center text-gray-500">
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailBookPage;
