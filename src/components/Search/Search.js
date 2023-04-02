import { useState, useRef, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

export default function Search({ toggle }) {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(null);
  const searchRef = useRef();

  useEffect(() => {
    setVisible(true);
  }, []);

  const close = (e) => {
    const targetClasses = [...e.target.classList];
    if ((targetClasses.includes(styles.wrapper) || targetClasses.includes(styles['close-btn'])) && visible) {
      setVisible(false);
      setTimeout(() => {
        toggle(false);
      }, 1000);
    }
  };

  return (
    <div className={cx('wrapper', { appear: visible }, { disappear: !visible })} onClick={close}>
      <div className={cx('search-input')}>
        <div className={cx('close-btn')} onClick={close}>
          &times;
        </div>
        <div className={cx('title')}>What are you looking for</div>
        <div className={cx('input')}>
          <input type="text" ref={searchRef} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <div className={cx('search-result')}>
        <div className={cx('texts')}>
          <div className={cx('item')}>
            <div className={cx('title')}>popular suggestions</div>
            <div className={cx('body')}>No suggestions were found</div>
          </div>
          <div className={cx('item')}>
            <div className={cx('title')}>categories</div>
            <div className={cx('body')}>No categories were found</div>
          </div>
          <div className={cx('item')}>
            <div className={cx('title')}>pages</div>
          </div>
        </div>
        <div className={cx('products item')}>
          <div className={cx('title')}>categories</div>
          <div className={cx('body')}>Sorry. Nothing found for {}</div>
        </div>
      </div>
    </div>
  );
}
