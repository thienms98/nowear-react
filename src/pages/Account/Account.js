import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

import classNames from 'classnames/bind';
import styles from './Account.module.scss';
const cx = classNames.bind(styles);

export default function Account() {
  const { page } = useParams();

  return (
    <div className={cx('wrapper', { reverse: page === 'register' })}>
      <div className={cx('main')}>
        {page === 'login' && <Login />}
        {page === 'register' && <Register />}
      </div>
      <div className={cx('side')}>
        <div className={cx('item', 'signin')}>
          <div className={cx('title')}>Welcome Back!</div>
          <div className={cx('content')}>To keep connected with us please login with your personal info</div>
          <Link to="/account/login">
            <div className={cx('btn')}>Sign in</div>
          </Link>
        </div>
        <div className={cx('item', 'signup')}>
          <div className={cx('title')}>Hello, Friend!</div>
          <div className={cx('content')}>Enter your personal details and start journey with us</div>
          <Link to="/account/register">
            <div className={cx('btn')}>Sign up</div>
          </Link>
        </div>
      </div>
      {/* <div className={cx('header')}>
        <div className={cx('item')}>
          <Link to="/account/login">Sign in</Link>
        </div>
        <div className={cx('item')}>
          <Link to="/account/register">Sign up</Link>
        </div>
      </div>

      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<>Register page</>} />
      </Routes> */}
    </div>
  );
}
