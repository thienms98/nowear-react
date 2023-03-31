import { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../App';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

export default function Header({ toggle }) {
  const { cart } = useContext(CartContext);
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
      if (window.scrollY > height) setSticky(true);
      else setSticky(false);
    };
    window.addEventListener('scroll', stickiedHeader);
    return () => window.removeEventListener('scroll', stickiedHeader);
  }, []);

  return (
    <div className={cx('wrapper', { sticky: sticky })} ref={headerRef}>
      <div className={cx('menu')}>
        <div
          className={cx('item')}
          onMouseOver={(e) => {
            e.currentTarget.setAttribute('data-animation', 'in');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.setAttribute('data-animation', 'out');
          }}
        >
          <Link to={'/'}>Home</Link>
        </div>
        <div
          className={cx('item')}
          onMouseOver={(e) => {
            e.currentTarget.setAttribute('data-animation', 'in');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.setAttribute('data-animation', 'out');
          }}
        >
          <Link to={'#'}>Shop</Link>
        </div>
        <div
          className={cx('item')}
          onMouseOver={(e) => {
            e.currentTarget.setAttribute('data-animation', 'in');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.setAttribute('data-animation', 'out');
          }}
        >
          <Link to={'/collection'}>Collections</Link>
        </div>
        <div
          className={cx('item')}
          onMouseOver={(e) => {
            e.currentTarget.setAttribute('data-animation', 'in');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.setAttribute('data-animation', 'out');
          }}
        >
          <Link to={'#'}>Sale</Link>
        </div>
      </div>

      <div className={cx('logo')}>
        <Link to={'/'}>Nowear</Link>
      </div>

      <div className={cx('user')}>
        <div className={cx('item', 'login')}>LOGIN</div>
        <div className={cx('item', 'search')} onClick={toggle}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className={cx('item', 'favorite')}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className={cx('item', 'cart', { 'new-arrive': newArrive })}>
          <FontAwesomeIcon icon={faCartShopping} />
          <div className={cx('index')}>{cart.length}</div>
        </div>
      </div>
    </div>
  );
}
