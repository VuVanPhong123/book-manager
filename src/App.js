import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import BookList from './pages/BookList/BookList'; 
import BookFinding from './pages/BookFinding/BookFinding';
import BookManage from './pages/BookManage/BookManage';
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function(){
  return(
    <BrowserRouter className='screen'>
      <Navbar/>
      <Routes>
        <Route path ='/logIn' element ={<Login/>}/>
        <Route path='/' element ={<Home/>} />
        <Route path = 'books' element = {<BookList/>} />
        <Route path = 'bookFind' element ={<BookFinding/>}/>
        <Route path = 'bookManage' element ={<BookManage/>}/>
      </Routes>
    </BrowserRouter>
  );
}