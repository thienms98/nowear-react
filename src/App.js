import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer } from './Layouts';
import { HomePage, Collection, Product, Account, Cart } from './pages';
import { Search } from './components/Search';

export default function App() {
  const [search, setSearch] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleSearch = (bool) => {
    if (!bool) setSearch((last) => !last);
    else setSearch(bool);
  };

  const bodyStyle = {
    margin: '40px 0',
  };

  return (
    <div
      className={`App ${darkTheme && 'dark'}`}
      style={{ minWidth: '100vh', backgroundColor: 'var(--primary-background)' }}
    >
      <Header toggle={toggleSearch} darkTheme={darkTheme} toggleTheme={() => setDarkTheme((prev) => !prev)} />
      {search && <Search toggle={toggleSearch} />}
      <div style={bodyStyle}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:collectionName" element={<Collection />} />
          <Route path="/collection/search/:query" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />

          <Route path="/account/:page" element={<Account />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
