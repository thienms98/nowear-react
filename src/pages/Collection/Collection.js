import { useState, useEffect, useRef } from 'react';
import { Product } from '../../components/Product';

import { Filters } from '../../components/Filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faSpinner } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Collection.module.scss';
const cx = classNames.bind(styles);
const limit = 12;

export default function Collection() {
  const [isEnd, setIsEnd] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(products);
  // add scroll event to check reached bottom or not
  useEffect(() => {
    fetch(`http://localhost:3600/products?_limit=${limit}`)
      .then((res) => res.json())
      .then((res) => setProducts(res));
    document.addEventListener('scroll', doesItEnded);

    return () => document.removeEventListener('scroll', doesItEnded);
  }, []);

  // load more products when reach bottom
  useEffect(() => {
    if (isEnd) {
      setLoading(true);
      fetch(`http://localhost:3600/products?_limit=${limit}&_page=${products.length / limit}`)
        .then((res) => res.json())
        .then((res) => {
          setProducts((last) => {
            return last.concat(res);
          });
          setIsEnd(false);
          setLoading(false);
        });
    }
  }, [isEnd]);

  const productsWrapper = useRef();
  const doesItEnded = (e) => {
    const wdHeight = window.innerHeight;
    const currentTopPosition = window.scrollY;
    const currentBottomPosition = wdHeight + currentTopPosition;

    const wrapperTopPosition = productsWrapper.current.offsetTop;
    const wrapperHeight = productsWrapper.current.offsetHeight;
    const wrapperBottomPosition = wrapperHeight + wrapperTopPosition;

    // reach bottom position (before 100px)
    if (currentBottomPosition + 100 > wrapperBottomPosition) setIsEnd(true);
    else setIsEnd(false);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('main')}>
        <div className={cx('title')}></div>
        <div>
          <div className={cx('total')}>15 products</div>
          <div className={cx('layouts')}>
            <div className={cx('item')}>2 cols</div>
            <div className={cx('item')}>3 cols</div>
            <div className={cx('item')}>4 cols</div>
            <div className={cx('item')}>details</div>
          </div>
        </div>
        <div className={cx('products')} ref={productsWrapper}>
          {products.map((product) => {
            return (
              <div className={cx('item')}>
                <Product product={product} />
              </div>
            );
          })}
        </div>
        {/* {loading && ( */}
        <div className={cx('loading')}>
          <FontAwesomeIcon icon={faSpinner} className={cx('icon')} />
        </div>
        {/* )} */}
      </div>
      <div className={cx('side')}>
        <div className={cx('filters')}>
          <Filters />
        </div>

        <div className={cx('collections')}></div>

        <div className={cx('products')}></div>
      </div>
    </div>
  );
}
