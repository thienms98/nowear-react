import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

const menu = [
  { title: 'Home', path: '/' },
  { title: 'Collection', path: '/collection' },
  { title: 'Sale', path: '/collection/sale' },
];

export default function Header({ toggle, darkTheme, toggleTheme }) {
  const cart = useSelector((state) => state.cart.list);
  const [newArrive, setNewArrive] = useState(false);
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    if (cart.length !== 0) {
      setNewArrive(true);
      setTimeout(() => {
        setNewArrive(false);
      }, 1000);
    }
  }, [cart]);

  // sticky header after scroll down
  const headerRef = useRef();
  useEffect(() => {
    const stickiedHeader = () => {
      const height = headerRef.current.offsetHeight;
      if (window.scrollY > height / 2) setSticky(true);
      else setSticky(false);
    };
    window.addEventListener('scroll', stickiedHeader);
    return () => window.removeEventListener('scroll', stickiedHeader);
  }, []);

  return (
    <div className={cx('wrapper', { sticky: sticky })} ref={headerRef}>
      <div className={cx('menu')}>
        {menu.map((mItem, index) => {
          return (
            <div
              className={cx('item')}
              onMouseOver={(e) => {
                e.currentTarget.setAttribute('data-animation', 'in');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.setAttribute('data-animation', 'out');
              }}
              key={index}
            >
              <Link to={mItem.path}>{mItem.title}</Link>
            </div>
          );
        })}
      </div>

      <div className={cx('logo')}>
        <Link to={'/'}>Nowear</Link>
      </div>

      <div className={cx('user')}>
        <div className={cx('theme')}>
          <div className={cx('icon', { reverse: darkTheme })} onClick={toggleTheme}>
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon icon={faMoon} />
          </div>
        </div>
        <div className={cx('item', 'login')}>
          <Link to={'/account/login'}>LOGIN</Link>
        </div>
        <div className={cx('item', 'search')} onClick={toggle}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className={cx('item', 'cart', { 'new-arrive': newArrive })}>
          <Link to={'/cart'}>
            <FontAwesomeIcon icon={faCartShopping} />
            <div className={cx('index')}>{cart.length}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
