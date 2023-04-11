import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './FilterItem.module.scss';
const cx = classNames.bind(styles);

export default function FilterItem({ title, drop, expand, children }) {
  return (
    <div className={cx('wrapper', { dropdown: drop })}>
      <div className={cx('title')} onClick={expand}>
        {title}
        <div className={cx('icon')}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <div className={cx('body')}>{children}</div>
    </div>
  );
}
