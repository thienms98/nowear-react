import { useState, useRef, useEffect } from 'react';
import FilterItem from './FilterItem';

import classNames from 'classnames/bind';
import styles from './Filters.module.scss';
const cx = classNames.bind(styles);

export default function Filters({ updateFilter }) {
  const [priceRange, setPriceRange] = useState([0, null]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3600/brands')
      .then((res) => res.json())
      .then((brands) => setBrands(brands));
  }, []);

  return (
    <div className={cx('wrapper')}>
      {/* <div className={cx('sort-options')}>
        <div className={cx('item')}>Featured</div>
        <div className={cx('item')}>Best selling</div>
        <div className={cx('item')}>Alphabeticaly, A-Z</div>
        <div className={cx('item')}>Alphabeticaly, Z-A</div>
        <div className={cx('item')}>Price, high to low</div>
        <div className={cx('item')}>Price, low to high</div>
        <div className={cx('item')}>Date, old to new</div>
        <div className={cx('item')}>Date, new to old</div>
      </div>
      <div className={cx('available')}>
        <div className={cx('item')}>In stock({35})</div>
        <div className={cx('item')}>Out of stock({3})</div>
      </div> */}
      <FilterItem title={'Vendors'}>
        <form className={cx('vendors')}>
          {brands.map((brand, index) => {
            return (
              <div key={index}>
                <input
                  type="radio"
                  name="vendor"
                  value={brand}
                  onChange={(e) => {
                    const form = e.target.parentNode.parentNode;
                    updateFilter({ brandName: form.vendor.value });
                  }}
                />
                {brand}
              </div>
            );
          })}
        </form>
      </FilterItem>
      <FilterItem title={'Price range'}>
        <div className={cx('text')}>
          <label htmlFor="min">From</label>
          <input type="number" id="min" />
          <label htmlFor="max">To</label>
          <input type="number" id="max" />
        </div>
        {/* <div className={cx('range')} ref={rangeRef}>
          <div className={cx('button')} ref={minRef} onMouseMove={moveTheThumb}></div>
          <div className={cx('button')} ref={maxRef}></div>
        </div> */}
      </FilterItem>
    </div>
  );
}
