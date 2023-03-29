import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faPinterest, faYoutube } from '@fortawesome/free-brands-svg-icons';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('subscribing')}>
        <div className={cx('title')}></div>
        <div className={cx('mail')}></div>
      </div>
      <div className={cx('body')}></div>
      <div className={cx('foot')}>
        <div className={cx('copy-right')}>&copy; {new Date().getFullYear()} Nowear. All right reserved</div>
        <div className={cx('socials')}>
          <div className="item">
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faYoutube} />
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faLinkedin} />
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faPinterest} />
          </div>
        </div>
      </div>
    </div>
  );
}
