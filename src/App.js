import { useState, useReducer, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer } from './Layouts';
import { HomePage, Collection } from './pages';
import { Search } from './components/Search';

export const CartContext = createContext();

export default function App() {
  const initCart = [];
  const cartReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.payload];
      case 'remove':
        state.splice(action.payload, 0);
        return state;
      default:
        return state;
    }
  };
  const [cart, dispatch] = useReducer(cartReducer, initCart);
  const [search, setSearch] = useState(false);
  console.log(search);
  const toggleSearch = (bool) => {
    console.log(bool);
    if (!bool) setSearch((last) => !last);
    else setSearch(bool);
  };

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div className="App">
        <Header toggle={toggleSearch} />
        {search && <Search toggle={toggleSearch} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
        <Footer />
      </div>
    </CartContext.Provider>
  );
}
