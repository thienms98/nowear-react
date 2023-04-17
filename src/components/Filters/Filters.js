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

  const [filterSelected, setFilterSelected] = useState(null);

  useEffect(() => {
    fetch('https://nowear-api.vercel.app/brands')
      .then((res) => res.json())
      .then((brands) => setBrands([null, ...brands]));

    fetch('https://nowear-api.vercel.app/colors')
      .then((res) => res.json())
      .then((colors) => setColors([null, ...colors]));

    fetch('https://nowear-api.vercel.app/collections')
      .then((res) => res.json())
      .then((collections) => setCollections(collections));
  }, []);

  const expand = (index) => {
    if (filterSelected === index) setFilterSelected(null);
    else setFilterSelected(index);
  };

  return (
    <div className={cx('wrapper')}>
      <FilterItem title={'Sort by'} drop={filterSelected === 0} expand={() => expand(0)}>
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
      <FilterItem title={'Vendors'} drop={filterSelected === 1} expand={() => expand(1)}>
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
      <FilterItem title={'Price range'} drop={filterSelected === 2} expand={() => expand(2)}>
        <Range list={priceValues} updateFilter={updateFilter} />
      </FilterItem>
      <FilterItem title={'Color'} drop={filterSelected === 3} expand={() => expand(3)}>
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
      <FilterItem title={'Collection'} drop={filterSelected === 4} expand={() => expand(4)}>
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
