import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from '../../hooks';
import { Product } from '../Product';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

export default function Search({ toggle }) {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(null);
  const [searchResult, setSearchResult] = useState({});
  const searchRef = useRef();
  console.log(searchResult);

  const searchText = useDebounce(text, 500);

  useEffect(() => {
    setVisible(true);
  }, []);

  const close = () => {
    setVisible(false);
    // setTimeout(() => {
    toggle(false);
    // }, 1000);
  };

  useEffect(() => {
    console.log(searchText);
    if (searchText?.trim()) {
      fetch(`https://nowear-api.vercel.app/products?name_like=${searchText}`)
        .then((res) => res.json())
        .then((res) =>
          setSearchResult((result) => {
            return { ...result, products: res };
          }),
        );
    }
  }, [searchText]);

  return (
    <div className={cx('wrapper', { appear: visible }, { disappear: !visible })}>
      <div className={cx('overlay')} onClick={close}></div>
      <div className={cx('search-input')}>
        <div className={cx('close-btn')} onClick={close}>
          &times;
        </div>
        <div className={cx('title')}>What are you looking for</div>
        <div className={cx('input')}>
          <input type="text" ref={searchRef} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <div className={cx('search-result')}>
        <div className={cx('products')}>
          {searchResult.products?.length === 0 && searchText.trim() && `Sorry. Nothing found for '${searchText}'`}
          {searchResult.products &&
            searchResult.products.slice(0, 3).map((prod) => {
              return (
                <div className={cx('product')} onClick={close}>
                  <Product product={prod} />
                </div>
              );
            })}
        </div>
        {searchResult.products?.length > 3 && (
          <div className={cx('btn')} onClick={close}>
            <Link to={`/collection/search/${searchText}`}>More Results</Link>
          </div>
        )}
      </div>
    </div>
  );
}
