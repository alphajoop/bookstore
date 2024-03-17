import Book from '../models/bookModel.js';

export async function createBook(req, res) {
  const { title, author, publishYear, description } = req.body;

  if (!title || !author || !publishYear || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newBook = await Book.create({
      title,
      author,
      publishYear,
      description,
    });

    res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    console.error('Failed to add new book:', error.message);
    res.status(400).json({ message: 'Failed to add new book', error: error.message });
  }
}

export async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    const count = await Book.countDocuments();
    res.status(200).json({ count, books });
  } catch (error) {
    console.error('Failed to get books:', error.message);
    res.status(500).json({ message: 'Failed to get books', error: error.message });
  }
}

export async function getBookById(req, res) {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Failed to get book by ID:', error.message);
    res.status(500).json({ message: 'Failed to get book by ID', error: error.message });
  }
}

export async function updateBook(req, res) {
  const bookId = req.params.id;
  const { title, author, publishYear, description } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, publishYear, description },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    console.error('Failed to update book:', error.message);
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
}

export async function deleteBook(req, res) {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Failed to delete book:', error.message);
    res.status(500).json({ message: 'Failed to delete book', error: error.message });
  }
}
