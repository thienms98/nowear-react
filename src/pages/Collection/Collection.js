import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Product } from '../../components/Product';
import { Filters } from '../../components/Filters';

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
  const { collectionName, query } = useParams();

  // add scroll event to check reached bottom or not
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setProducts(res));

    document.addEventListener('scroll', isItEnded);
    return () => document.removeEventListener('scroll', isItEnded);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnd]);

  // map filters to get correct fetching url
  useEffect(() => {
    let newUrl = origin;
    Object.keys(filters).forEach((key, index) => {
      if (filters[key]) newUrl += `&${key}=${filters[key]}`;
    });
    setUrl(newUrl);
  }, [filters]);

  useEffect(() => {
    updateFilter({
      name_like: query,
      category_like: collectionName === 'sale' ? null : collectionName,
      originalPrice_ne: collectionName === 'sale' ? 'null' : null,
    });
  }, [query, collectionName]);

  const updateFilter = (params) => {
    setFilters((lastFilter) => {
      return { ...lastFilter, ...params };
    });
  };

  const productsWrapper = useRef();
  const isItEnded = () => {
    const windowHeight = window.innerHeight;
    const currentTopPosition = window.scrollY;
    const currentBottomPosition = windowHeight + currentTopPosition;

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
        <div className={cx('products')} ref={productsWrapper}>
          {products.length === 0 ? (
            <>
              There are no product match the conditions
              <br /> Try to change the conditions with the filter on the right =&gt;
            </>
          ) : (
            products.map((product, index) => {
              return (
                <div className={cx('item')} key={index}>
                  <Product product={product} />
                </div>
              );
            })
          )}
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
