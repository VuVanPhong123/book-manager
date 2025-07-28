import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookList from './pages/BookList'; // Updated import path
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
}