import { useState, useRef, useEffect } from 'react';
import FilterItem from './FilterItem';

import classNames from 'classnames/bind';
import styles from './Filters.module.scss';
const cx = classNames.bind(styles);

export default function Filters({ updateFilter }) {
  const priceValues = [0, 5, 10, 20, 50, 100, 200, null];
  const [priceRange, setPriceRange] = useState([0, 7]);
  const [brands, setBrands] = useState([]);
  const [thumbSelected, setThumbSelected] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3600/brands')
      .then((res) => res.json())
      .then((brands) => setBrands(brands));
  }, []);

  useEffect(() => {
    if (priceRange[0] > priceRange[1]) {
      setPriceRange([priceRange[1], priceRange[0]]);
    }
    const priceFilter = { price_gte: priceValues[priceRange[0]], price_lte: priceValues[priceRange[1]] };
    if (!priceValues[priceRange[1]]) delete priceFilter.price_lte;
    updateFilter(priceFilter);
  }, [priceRange]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('sort-options')}>
        {/* <div className={cx('item')}>Featured</div>
        <div className={cx('item')}>Best selling</div>
        <div className={cx('item')}>Alphabeticaly, A-Z</div>
        <div className={cx('item')}>Alphabeticaly, Z-A</div>
        <div className={cx('item')}>Price, high to low</div>
        <div className={cx('item')}>Price, low to high</div>
        <div className={cx('item')}>Date, old to new</div>
        <div className={cx('item')}>Date, new to old</div> */}
      </div>
      <div className={cx('available')}>
        <div className={cx('item')}>In stock({35})</div>
        <div className={cx('item')}>Out of stock({3})</div>
      </div>
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
        <div className={cx('price-range')}>
          <div className={cx('text')}>
            <label htmlFor="min">From ${priceValues[priceRange[0]]} </label>
            <label htmlFor="max">To ${priceValues[priceRange[1] || <>&infin;</>]}</label>
          </div>

          <div className={cx('range')}>
            <input
              className={cx({ over: thumbSelected === 0 })}
              type="range"
              min={0}
              max={priceValues.length - 1}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange((prices) => {
                  const pr = [...prices];
                  pr[0] = e.target.value;
                  return pr;
                })
              }
            />
            <input
              className={cx({ over: thumbSelected === 1 })}
              type="range"
              min={0}
              max={priceValues.length - 1}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange((prices) => {
                  const pr = [...prices];
                  pr[1] = e.target.value;
                  return pr;
                })
              }
            />
            {priceRange.map((price, index) => {
              const len = priceValues.length;
              return (
                <div
                  className={cx('thumb')}
                  style={{ '--pos': `${price * (100 / (len - 1))}%` }}
                  onMouseOver={() => {
                    setThumbSelected(index);
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </FilterItem>
    </div>
  );
}
