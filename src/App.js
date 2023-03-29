import { useReducer, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer } from './Layouts';
import { HomePage, Collection } from './pages';

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

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
        <Footer />
      </div>
    </CartContext.Provider>
  );
}
