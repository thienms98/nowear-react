import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Page404.module.scss';
const cx = classNames.bind(styles);

export default function Page404() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('main')}>
        <div className={cx('text')}>404</div>
      </div>
      <div className={cx('title')}>Page not found</div>
      <p>Sorry, the page you are looking for is not available. Maybe you want to perform a search?</p>
      <div className={cx('btn')}>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
}
