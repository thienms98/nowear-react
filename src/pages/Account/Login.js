import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

import { auth } from '../../firebase';

import classNames from 'classnames/bind';
import styles from './Account.module.scss';
const cx = classNames.bind(styles);

export default function Login(props) {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <div className={cx('head')}>Sign In</div>

      <div className={cx('via')}>
        <div className={cx('item', 'fb')} title="Login via Facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </div>
        <div className={cx('item', 'gg')} title="Login via Google">
          <FontAwesomeIcon icon={faGoogle} />
        </div>
      </div>
      <form>
        <div className={cx('field')}>
          <div className={cx('title')}>or use your account</div>
        </div>
        <div className={cx('field')}>
          <div className={cx('label')}>Email</div>
          <input
            type="email"
            name="email"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="youremail@domain.com"
          />
        </div>
        <div className={cx('field')}>
          <div className={cx('label')}>Password</div>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="******"
          />
        </div>
        <div className={cx('field')}>
          <div className={cx('forgot')}>Forgot your password?</div>
        </div>
        <div className={cx('field')}>
          <div className={cx('btn')}>SIGN IN</div>
        </div>
      </form>
    </>
  );
}
