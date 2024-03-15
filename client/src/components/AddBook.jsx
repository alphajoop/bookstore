import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookApi from '../api/bookApi';
import useAsyncState from '../utils/hooks/useAsyncState';
import BackButton from './BackButton';
import Spinner from './Spinner';

function AddBook() {
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const {
    loading,
    setLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useAsyncState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await bookApi.addBook({ title, author, publishYear });
      setSuccessMessage('Book added successfully');
      setTitle('');
      setAuthor('');
      setPublishYear('');
      history('/');
    } catch (error) {
      console.error('Error adding book:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('Failed to add book.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-0 mx-auto max-w-full p-10">
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="w-full overflow-auto">
          <div className="flex justify-between items-center p-6">
            <BackButton />
            <h1 className="text-2xl font-bold">Create Book</h1>
          </div>
          <div className="overflow-x-auto p-4">
            <div className="flex justify-center items-center">
              <div className="max-w-3xl w-full">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:border-transparent focus:ring-gray-400"
                      placeholder="Book Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:border-transparent focus:ring-gray-400"
                      placeholder="Author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:border-transparent focus:ring-gray-400"
                      placeholder="Publish Year"
                      value={publishYear}
                      onChange={(e) => setPublishYear(e.target.value)}
                      required
                    />
                    {/* 
                      <textarea
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-gray-500"
                      placeholder="Description"
                      rows="4"
                      />
                    */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Save
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

export default AddBook;
