import { Route, Routes } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import DeleteBookPage from './pages/DeleteBookPage';
import DetailBookPage from './pages/DetailBookPage';
import EditBookPage from './pages/EditBookPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book/add" element={<AddBookPage />} />
      <Route path="/book/detail/:id" element={<DetailBookPage />} />
      <Route path="/book/edit/:id" element={<EditBookPage />} />
      <Route path="/book/delete/:id" element={<DeleteBookPage />} />
    </Routes>
  );
}

export default App;
