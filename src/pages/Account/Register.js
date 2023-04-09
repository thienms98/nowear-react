import classNames from 'classnames/bind';
import styles from './Account.module.scss';
const cx = classNames.bind(styles);

export default function Register() {
  return (
    <>
      <div className={cx('head')}>Sign Up</div>

      <form>
        <div className={cx('field')}>
          <div className={cx('title')}>or use your email to registration</div>
        </div>
        <div className={cx('field')}>
          <div className={cx('label')}>Name</div>
          <input type="text" name="name" placeholder="Yourname" />
        </div>
        <div className={cx('field')}>
          <div className={cx('label')}>Email</div>
          <input type="email" name="email" placeholder="youremail@domain.com" />
        </div>
        <div className={cx('field')}>
          <div className={cx('label')}>Password</div>
          <input type="password" name="password" placeholder="******" />
        </div>
        <div className={cx('field')}>
          <div className={cx('label')}>Password</div>
          <input type="password" name="password" placeholder="******" />
        </div>
        <div className={cx('field')}>
          <div className={cx('btn')}>SIGN UP</div>
        </div>
      </form>
    </>
  );
}
