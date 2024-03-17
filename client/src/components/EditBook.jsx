import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookApi from '../api/bookApi';
import useAsyncState from '../utils/hooks/useAsyncState';
import BackButton from './BackButton';
import Spinner from './Spinner';

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: '',
    description: '',
  });
  const {
    loading,
    setLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useAsyncState();

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
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id, setError, setLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await bookApi.updateBook(id, book);
      setSuccessMessage(response.message);
    } catch (error) {
      console.error('Error updating book:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('Failed to update book.');
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  return (
    <div className="my-0 mx-auto max-w-full p-4 md:p-10">
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="w-full overflow-auto">
          <div className="flex justify-between items-center p-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Update Book</h1>
          </div>
          <div className="overflow-x-auto p-4">
            <div className="flex justify-center items-center">
              <div className="max-w-3xl w-full">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="title"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:border-transparent focus:ring-gray-400"
                      placeholder="Book Title"
                      value={book.title}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="author"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:border-transparent focus:ring-gray-400"
                      placeholder="Author"
                      value={book.author}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="number"
                      name="publishYear"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:border-transparent focus:ring-gray-400"
                      placeholder="Publish Year"
                      value={book.publishYear}
                      onChange={handleInputChange}
                    />
                    <textarea
                      type="text"
                      name="description"
                      className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:border-transparent focus:ring-gray-400"
                      placeholder="Description"
                      value={book.description}
                      onChange={handleInputChange}
                      rows="4"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Update Book
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {successMessage && <div>Success: {successMessage}</div>}
    </div>
  );
}

export default EditBook;
