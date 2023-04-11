import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../components/Product';

import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
const cx = classNames.bind(styles);

export default function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3600/homepage')
      .then((res) => res.json())
      .then((res) => setProducts(res.products));
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('cover')}>
        <div className={cx('image')}>
          <img
            src={'https://cdn.shopify.com/s/files/1/0551/8001/files/banner-5_1920x700_crop_top.jpg?v=1618834930'}
            alt=""
          />
        </div>
        <div className={cx('body')}>
          <div className={cx('title')} data-text="The">
            lastest trends in fashion
          </div>
          <div className={cx('text')}>You always be in fashion with our collection of clothing</div>
          <div className={cx('btn')}>
            <Link to="">explore collections</Link>
          </div>
        </div>
      </div>

      <div className={cx('banners')}>
        <div className={cx('item')}>
          <div className={cx('image')}>
            <img
              src={
                'https://cdn.shopify.com/s/files/1/0551/8001/files/banner-6_960x462_crop_center.jpg?v=1618846628 1200w'
              }
              alt=""
            />
          </div>
          <div className={cx('body')}>
            <div className={cx('title')}>Denim perfect</div>
            <div className={cx('text')}>Up to 40% off on all items.</div>
            <div className={cx('more')}></div>
            <div className={cx('btn')}>Shop now</div>
          </div>
        </div>
        <div className={cx('item')}>
          <div className={cx('image')}>
            <img
              src={
                'https://cdn.shopify.com/s/files/1/0551/8001/files/banner-7_960x462_crop_center.jpg?v=1618846654 1200w'
              }
              alt=""
            />
          </div>
          <div className={cx('body')}>
            <div className={cx('title')}>men's t-shirts</div>
            <div className={cx('text')}>New in this week</div>
            <div className={cx('more')}>Sale up to 50% off!</div>
            <div className={cx('btn')}>Shop now</div>
          </div>
        </div>
      </div>

      <div className={cx('bestsellers')}>
        <div className={cx('title')}>
          <div className={cx('main')}>Best sellers</div>
          <div className={cx('ext')}>Top sale in this week</div>
        </div>
        <div className={cx('products')}>
          {products.map((prod) => {
            return (
              <div className={cx('item')} key={prod.index}>
                <Product product={prod} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={cx('banners')}>
        <div className={cx('item')}>
          <div className={cx('image')}>
            <img
              src={
                'https://cdn.shopify.com/s/files/1/0551/8001/files/banner-1_df983c8a-1520-4749-afd0-345e270c3ea2_1920x600_crop_top.jpg?v=1618847289'
              }
              alt=""
            />
          </div>
          <div className={cx('body')}>
            <div className={cx('title')}>explozre the new range</div>
            <div className={cx('text')}>Best price, best selection!</div>
            <div className={cx('more')}>Get up to 20% off on New Arrivals</div>
            <div className={cx('btn')}>Shop now</div>
          </div>
        </div>
      </div>

      {/* <div className={cx('deal')}></div>

      <div className={cx('brands')}>Explore our brands</div> */}
    </div>
  );
}
