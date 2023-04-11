import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faPinterest, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

export default function Footer() {
  const [mail, setMail] = useState('');
  const [sub, setSub] = useState(false);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('subscribing')}>
        <div className={cx('title')}>
          <div className={cx('main')}>SUBSCRIBE TO OUR NEWSLETTER</div>
          <div className={cx('sub')}>Join our mailing list for the lastest product updates!</div>
        </div>
        <div className={cx('mail')}>
          {sub ? (
            'YOU HAVE SUCCESSFULLY SUBSCRIBED'
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (mail) setSub(true);
              }}
            >
              <input type="email" value={mail} placeholder="Email Address" onChange={(e) => setMail(e.target.value)} />
              <input
                type="submit"
                value={'SUBSCRIBE'}
                onClick={() => {
                  if (mail.trim()) setSub(true);
                }}
              />
            </form>
          )}
        </div>
      </div>
      <div className={cx('body')}>
        <div className={cx('col')}>
          <div className={cx('vendy')}>Vendy</div>
          <div className={cx('slogan')}>
            Our company is dedicated to creating unique and comfortable clothing for men and women.
          </div>
          <div className={cx('contact')}>
            <div className={cx('item')}>
              <FontAwesomeIcon icon={faPhone} />
              <span>Call Us: 800-123-4567</span>
            </div>
            <div className={cx('item')}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Send us an email</span>
            </div>
          </div>
        </div>
        <div className={cx('col')}>
          <div className={cx('title')}>Company</div>
          <div className={cx('item')}>Delivery</div>
          <div className={cx('item')}>Refund Policy</div>
          <div className={cx('item')}>About Us</div>
          <div className={cx('item')}>Contact Us</div>
          <div className={cx('item')}>Terms and conditions</div>
        </div>
        <div className={cx('col')}>
          <div className={cx('title')}>Infomation</div>
          <div className={cx('item')}>FAQ's</div>
          <div className={cx('item')}>Terms</div>
          <div className={cx('item')}>Delivery Info</div>
          <div className={cx('item')}>Size Guide</div>
        </div>
        <div className={cx('col')}></div>
      </div>
      <div className={cx('foot')}>
        <div className={cx('copy-right')}>&copy; {new Date().getFullYear()} Nowear. All right reserved</div>
        <div className={cx('socials')}>
          <div className={cx('item')}>
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div className={cx('item')}>
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <div className={cx('item')}>
            <FontAwesomeIcon icon={faYoutube} />
          </div>
          <div className={cx('item')}>
            <FontAwesomeIcon icon={faLinkedin} />
          </div>
          <div className={cx('item')}>
            <FontAwesomeIcon icon={faPinterest} />
          </div>
        </div>
      </div>
    </div>
  );
}
