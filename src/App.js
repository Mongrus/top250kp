import './App.sass';
import AppContext from './context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/layout/Main';
import Posts from './components/Posts';
import Registered from './components/Registered';
import Login from './components/Login';
import Post from './components/Post';
import { useState, useEffect } from 'react';
import WelcomePage from './components/WelcomePage';

function App() {
  const [arrFilms, setArrFilms] = useState([]);
  const [oneFilms, setOneFilms] = useState('');
  const [filterFilms, setFilterFilms] = useState('');
  const [newArr, setNewArr] = useState('');
  const [arrCarousel, setArrCarousel] = useState([]);
  const [user, setUser] = useState('');

  const newGet = async () => {
    try {
      await fetch('https://rapid-complete-dress.glitch.me/posts', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => setArrFilms(json));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newGet();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <AppContext.Provider
          value={{
            arrFilms,
            setArrFilms,
            oneFilms,
            setOneFilms,
            filterFilms,
            setFilterFilms,
            newArr,
            setNewArr,
            arrCarousel,
            setArrCarousel,
            user,
            setUser,
          }}
        >
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<WelcomePage />}></Route>
              <Route path="posts" element={<Posts />}></Route>
              <Route path="posts/:id" element={<Post />}></Route>
              <Route path="registered" element={<Registered />}></Route>
              <Route path="login" element={<Login />}></Route>
            </Route>
          </Routes>
        </AppContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
