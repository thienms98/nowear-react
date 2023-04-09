import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
const cx = classNames.bind(styles);

export default function Carousel({ list }) {
  const [current, setCurrent] = useState(0);
  const listRef = useRef();

  useEffect(() => {
    if (current < 0) setCurrent(list.length - 1);
    if (current >= list.length) setCurrent(0);

    if (list.length <= 5) return;
    if (current >= 3 && current + 3 <= list.length) {
      listRef.current.style.transform = `translateX(${(-100 / list.length) * (current - 2)}%)`;
    }
    if (current < 3) listRef.current.style.transform = `translateX(0)`;
    if (current === list.length - 1)
      listRef.current.style.transform = `translateX(${(-100 / list.length) * (list.length - 5)}%)`;
  }, [current]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('main')}>
        <div
          className={cx('chevron')}
          onClick={() => {
            const next = current - 1 < 0 ? list.length - 1 : current - 1;
            setCurrent(next);
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div
          className={cx('chevron')}
          onClick={() => {
            const next = current + 1 >= list.length ? 0 : current + 1;
            setCurrent(next);
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className={cx('dots')}>
          {list.map((item, index) => {
            return (
              <div
                className={cx('item', { active: index === current })}
                key={index}
                onClick={() => setCurrent(index)}
              ></div>
            );
          })}
        </div>
        <img src={list[current]} alt="" />
      </div>
      {/* <div className={cx('zoom')}>
        <img src={list[current]} alt="" />
      </div> */}
      <div className={cx('list')} ref={listRef} style={{ width: `${list.length * 20}%` }}>
        {list.map((item, index) => {
          return (
            <div className={cx('item', { active: current === index })} key={index} onClick={() => setCurrent(index)}>
              <img src={item} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
