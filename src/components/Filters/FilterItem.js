import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './FilterItem.module.scss';
const cx = classNames.bind(styles);

export default function FilterItem({ title, children }) {
  const [state, setState] = useState(false);
  return (
    <div className={cx('wrapper', { dropdown: state })}>
      <div className={cx('title')} onClick={() => setState((state) => !state)}>
        {title}
        <div className={cx('icon')}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <div className={cx('body')}>{children}</div>
    </div>
  );
}
