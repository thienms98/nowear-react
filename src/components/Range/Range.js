import classNames from 'classnames/bind';
import styles from './Range.module.scss';
const cx = classNames.bind(styles);

export default function Range({ values }) {
  return (
    <div className={cx('wrapper')}>
      {values.map((value, index) => {
        return <div className={cx('value')}></div>;
      })}
    </div>
  );
}
