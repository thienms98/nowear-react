import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
const cx = classNames.bind(styles);

export default function Checkout() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('form')}></div>
    </div>
  );
}
