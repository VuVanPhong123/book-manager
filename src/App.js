import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import BookList from './pages/BookList/BookList'; 
import BookFinding from './pages/BookFinding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function(){
  return(
    <BrowserRouter className='screen'>
      <Navbar/>
      <Routes>
        <Route path='/' element ={<Home/>} />
        <Route className = 'BookList' path = 'books' element = {<BookList/>} />
        <Route path = 'bookFind' element ={<BookFinding/>}/>
      </Routes>
    </BrowserRouter>
  );
}