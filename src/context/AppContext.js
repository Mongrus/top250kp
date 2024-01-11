import { createContext } from 'react';

const AppContext = createContext({
  arrFilms: [],
  oneFilms: '',
  filterFilms: '',
  newArr: '',
  arrCarousel: [],
  user: '',
  setArrFilms: () => {},
  setOneFilms: () => {},
  setFilterFilms: () => {},
  setNewArr: () => {},
  setArrCarousel: () => {},
  setUser: () => {},
});

export default AppContext;
