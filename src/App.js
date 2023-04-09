import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer } from './Layouts';
import { HomePage, Collection, Product, Account, Cart } from './pages';
import { Search } from './components/Search';

export default function App() {
  const [search, setSearch] = useState(false);
  const toggleSearch = (bool) => {
    if (!bool) setSearch((last) => !last);
    else setSearch(bool);
  };

  const bodyStyle = {
    margin: '40px 0',
  };

  return (
    <div className="App" style={{ minWidth: '100vh' }}>
      <Header toggle={toggleSearch} />
      {search && <Search toggle={toggleSearch} />}
      <div style={bodyStyle}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:query" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />

          <Route path="/account/:page" element={<Account />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
