import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL,
});

const bookApi = {
  getAllBooks: async () => {
    try {
      const response = await axiosInstance.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },
  getBookById: async (id, getBookById) => {
    try {
      const response = await axiosInstance.get(`/books/${id}`, getBookById);
      return response.data;
    } catch (error) {
      console.error('Error getting book by id:', error);
      throw error;
    }
  },
  addBook: async (newBook) => {
    try {
      const response = await axiosInstance.post('/books', newBook);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },
  updateBook: async (id, updatedBook) => {
    try {
      const response = await axiosInstance.put(`/books/${id}`, updatedBook);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },
  deleteBook: async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  },
};

export default bookApi;
