import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye, faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { add } from '../../redux/reducers/cart';

import classNames from 'classnames/bind';
import styles from './Product.module.scss';
const cx = classNames.bind(styles);

export default function Product({ product }) {
  const dispatch = useDispatch();
  const [fav, setFav] = useState(false);

  return (
    <Link to={`/product/${product.id}`}>
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <div className={cx('image')}>
            <img src={'https://' + product.imageUrl} alt="" />
          </div>
          <div className={cx('image')}>
            <img src={product.hoverImage} alt="" />
          </div>
          <div className={cx('tags')}>
            <div className={cx('item')}>New</div>
            {product.originalPrice && product.price < product.originalPrice && (
              <div className={cx('item', 'sale')}>SALE</div>
            )}
          </div>
          <div className={cx('interact')}>
            <div className={cx('item', 'fav', { selected: fav })} onClick={() => setFav((lastFav) => !lastFav)}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <div className={cx('more')}>
            <div
              className={cx('item')}
              title="Add to cart"
              onClick={() => {
                dispatch(add(product));
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
            <div className={cx('item')} title="Quick view">
              <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div className={cx('body')}>
          <div className={cx('colors')}>
            {product.colors?.map((color) => {
              return <div className="item">{color}</div>;
            })}
          </div>
          <div className={cx('sizes')}>
            {product.sizes?.map((size) => {
              return <div className="item">{size}</div>;
            })}
          </div>
          <div className={cx('title')}>{product.name}</div>
          <div className={cx('price')}>
            {product.originalPrice && product.price !== product.originalPrice ? (
              <>
                <div className={cx('sale')}>
                  ${product.price} (-{Math.ceil((1 - product.price / product.originalPrice) * 100)}%)
                </div>
                <div className={cx('original')}>${product.originalPrice}</div>
              </>
            ) : (
              '$' + product.price
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
