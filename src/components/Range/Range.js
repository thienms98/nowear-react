import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks';

import classNames from 'classnames/bind';
import styles from './Range.module.scss';
const cx = classNames.bind(styles);

export default function Range({ list, updateFilter }) {
  const [thumbSelected, setThumbSelected] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 7]);
  const priceDebounce = useDebounce(priceRange, 500);
  const length = list.length;

  useEffect(() => {
    const priceFilter = { price_gte: list[priceDebounce[0]], price_lte: list[priceDebounce[1]] };
    updateFilter(priceFilter);
  }, [priceDebounce]);

  useEffect(() => {
    if (priceRange[0] > priceRange[1]) {
      setPriceRange([priceRange[1], priceRange[0]]);
    }
  }, [priceRange]);

  return (
    <div className={cx('price-range')}>
      <div className={cx('text')}>
        <label htmlFor="min">From ${list[priceRange[0]]} </label>
        <label htmlFor="max">{list[priceRange[1]] === null ? '' : `To $${list[priceRange[1]]}`}</label>
      </div>

      <div className={cx('range')}>
        <input
          className={cx({ over: thumbSelected === 0 })}
          type="range"
          min={0}
          max={length - 1}
          value={priceRange[0]}
          onChange={(e) =>
            setPriceRange((prices) => {
              const priceRanges = [...prices];
              priceRanges[0] = e.target.value;
              return priceRanges;
            })
          }
        />
        <input
          className={cx({ over: thumbSelected === 1 })}
          type="range"
          min={0}
          max={length - 1}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange((prices) => {
              const priceRanges = [...prices];
              priceRanges[1] = e.target.value;
              return priceRanges;
            })
          }
        />
        {priceRange.map((price, index) => {
          const len = length;
          return (
            <>
              <div
                className={cx('thumb', { hidden: thumbSelected === index })}
                style={{ '--pos': `${price * (100 / (len - 1))}%` }}
                onMouseOver={() => {
                  setThumbSelected(index);
                }}
                key={index}
              ></div>
            </>
          );
        })}
        <div
          className={cx('inside')}
          style={{
            '--len': `${(priceRange[1] - priceRange[0]) * (100 / (length - 1))}%`,
            '--pos': `${priceRange[0] * (100 / (length - 1))}%`,
          }}
        ></div>
        <div className={cx('outside')}></div>
      </div>
    </div>
  );
}
