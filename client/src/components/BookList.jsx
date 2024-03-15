import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bookApi from '../api/bookApi';
import DetailIcon from '../assets/icons/DetailIcon';
import { EditIcon } from '../assets/icons/EditIcon';
import TrashIcon from '../assets/icons/TrashIcon';
import useAsyncState from '../utils/hooks/useAsyncState';
import Spinner from './Spinner';

function BookList() {
  const [books, setBooks] = useState([]);
  const { loading, setLoading, error, setError } = useAsyncState();

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const { books, message } = await bookApi.getAllBooks();
        setBooks(books);
        setLoading(false);
        if (message) {
          setError(message);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError('Failed to fetch books.');
        }
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [setError, setLoading]);

  return (
    <div className="my-0 mx-auto max-w-full p-10">
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="w-full overflow-auto rounded border">
          <div className="flex justify-between items-center mb-4 p-4">
            <h1 className="text-2xl font-bold text-gray-800">Bookstore list</h1>
            <Link to={'book/add'} className="flex items-center text-gray-500">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr className="text-sm font-medium text-gray-500">
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Author</th>
                  <th className="px-4 py-3 text-left">Publish Year</th>
                  <th className="px-4 py-3 text-right">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {books.map((book, index) => (
                  <tr key={book._id} className="text-sm text-gray-500">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{book.title}</td>
                    <td className="px-4 py-3">{book.author}</td>
                    <td className="px-4 py-3">{book.publishYear}</td>
                    <td className="px-4 py-3 flex justify-end gap-2">
                      <Link
                        to={`book/detail/${book._id}`}
                        className="flex items-center text-gray-500"
                      >
                        <DetailIcon />
                      </Link>
                      <Link
                        to={`book/edit/${book._id}`}
                        className="flex items-center text-gray-500"
                      >
                        <EditIcon />
                      </Link>
                      <Link
                        to={`book/delete/${book._id}`}
                        className="flex items-center text-gray-500"
                      >
                        <TrashIcon />
                      </Link>
                    </td>
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

export default BookList;
