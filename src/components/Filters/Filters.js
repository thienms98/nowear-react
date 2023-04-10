import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterItem from './FilterItem';
import { Range } from '../Range';

import classNames from 'classnames/bind';
import styles from './Filters.module.scss';
const cx = classNames.bind(styles);

export default function Filters({ updateFilter }) {
  const priceValues = [0, 5, 10, 20, 50, 100, 150, 200, 250, null];
  const sortOptions = [
    { title: 'All', filter: { _sort: null, _order: null } },
    { title: 'Alphabeticaly, A-Z', filter: { _sort: 'name', _order: 'asc' } },
    { title: 'Alphabeticaly, A-Z', filter: { _sort: 'name', _order: 'desc' } },
    { title: 'Price, low to high', filter: { _sort: 'price', _order: 'asc' } },
    { title: 'Price, high to low', filter: { _sort: 'price', _order: 'desc' } },
  ];
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [collections, setCollections] = useState([]);

  const [colorSelected, setColorSelected] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3600/brands')
      .then((res) => res.json())
      .then((brands) => setBrands([null, ...brands]));

    fetch('http://localhost:3600/colors')
      .then((res) => res.json())
      .then((colors) => setColors([null, ...colors]));

    fetch('http://localhost:3600/collections')
      .then((res) => res.json())
      .then((collections) => setCollections(collections));
  }, []);

  return (
    <div className={cx('wrapper')}>
      <FilterItem title={'Sort by'}>
        <div className={cx('sort-options')}>
          {sortOptions.map((sort, index) => {
            return (
              <div
                className={cx('item', { selected: sortBy === index })}
                onClick={() => {
                  updateFilter(sort.filter);
                  setSortBy(index);
                }}
                key={index}
              >
                {sort.title}
              </div>
            );
          })}
        </div>
      </FilterItem>
      <FilterItem title={'Vendors'}>
        <form className={cx('vendors')}>
          {brands.map((brand, index) => {
            return (
              <div className={cx('input')} key={index}>
                <input
                  type="radio"
                  name="vendor"
                  value={brand}
                  onChange={(e) => {
                    const form = e.target.parentNode.parentNode;
                    updateFilter({ brandName: form.vendor.value });
                  }}
                  id={`input${index}`}
                />
                <label htmlFor={`input${index}`}>{brand || 'All'}</label>
              </div>
            );
          })}
        </form>
      </FilterItem>
      <FilterItem title={'Price range'}>
        <Range list={priceValues} updateFilter={updateFilter} />
      </FilterItem>
      <FilterItem title={'Color'}>
        <div className={cx('colors')}>
          {colors.map((color, index) => {
            return (
              <div
                className={cx('item', { selected: color === colorSelected })}
                key={index}
                style={{ '--bgc': color }}
                title={color || 'no color'}
                onClick={() => {
                  updateFilter({ color_like: color });
                  setColorSelected(color);
                }}
              ></div>
            );
          })}
        </div>
      </FilterItem>
      <FilterItem title={'Collection'}>
        <div className={cx('collections')}>
          {collections.map((collection) => {
            return (
              <div className={cx('item')} key={collection}>
                <Link to={`/collection/${collection}`}>{collection}</Link>
              </div>
            );
          })}
        </div>
      </FilterItem>
    </div>
  );
}
