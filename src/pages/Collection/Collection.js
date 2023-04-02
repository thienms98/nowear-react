import { useState, useEffect, useRef } from 'react';
import { Product } from '../../components/Product';

import { Filters } from '../../components/Filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faSpinner } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Collection.module.scss';
const cx = classNames.bind(styles);
const limit = 12;
const origin = 'http://localhost:3600/products?_limit=' + limit;

export default function Collection() {
  const [isEnd, setIsEnd] = useState(false);
  const [url, setUrl] = useState(origin);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  // add scroll event to check reached bottom or not
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setProducts(res));

    document.addEventListener('scroll', doesItEnded);
    return () => document.removeEventListener('scroll', doesItEnded);
  }, [url]);

  // load more products when reach bottom
  useEffect(() => {
    if (isEnd) {
      setLoading(true);
      fetch(url + '&_start=' + products.length)
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

  useEffect(() => {
    let newUrl = origin;
    Object.keys(filters).forEach((key, index) => {
      newUrl += `&${key}=${filters[key]}`;
    });
    setUrl(newUrl);
  }, [filters]);

  const updateFilter = (params) => {
    setFilters((lastFilter) => {
      return { ...lastFilter, ...params };
    });
  };
  console.log(url);

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
          {products.map((product, index) => {
            return (
              <div className={cx('item')} key={index}>
                <Product product={product} />
              </div>
            );
          })}
        </div>
        {loading && (
          <div className={cx('loading')}>
            <FontAwesomeIcon icon={faSpinner} className={cx('icon')} />
          </div>
        )}
      </div>
      <div className={cx('side')}>
        <div className={cx('filters')}>
          <Filters updateFilter={updateFilter} />
        </div>

        <div className={cx('collections')}></div>

        <div className={cx('products')}></div>
      </div>
    </div>
  );
}
