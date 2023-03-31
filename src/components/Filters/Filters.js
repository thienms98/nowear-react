import { useState, useRef, useEffect } from 'react';
import FilterItem from './FilterItem';

import classNames from 'classnames/bind';
import styles from './Filters.module.scss';
const cx = classNames.bind(styles);

export default function Filters() {
  const [priceRange, setPriceRange] = useState([0, null]);
  const rangeRef = useRef(),
    minRef = useRef(),
    maxRef = useRef();

  useEffect(() => {
    // const rangeWidth = rangeRef.current.offsetWidth;
  }, [priceRange]);

  const moveTheThumb = (event) => {
    console.log(event.keyCode);
    // if (event.which === 1) console.log(event.pageX, event.pageY);
    // console.log(event.target.offsetLeft);
    // console.log(event.pageX);
  };

  const choosePosForTheThumb = (event) => {
    console.log();
  };

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
      <FilterItem title={'Vendors'}></FilterItem>
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
