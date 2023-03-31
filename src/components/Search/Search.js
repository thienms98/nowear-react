import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

export default function Search({ toggle }) {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(true);
  const searchRef = useRef();

  const close = () => {
    setVisible((visible) => !visible);
    setTimeout(() => {
      toggle();
    }, 1000);
  };

  return (
    <div className={cx('wrapper', { appear: visible }, { disappear: !visible })} onClick={close}>
      <div className={cx('search-input')}>
        <div className={cx('close-btn')} onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
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
