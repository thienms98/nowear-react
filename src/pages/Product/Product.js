import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../redux/reducers/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faRuler } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from '../../components/Carousel';

import classNames from 'classnames/bind';
import styles from './Product.module.scss';
const cx = classNames.bind(styles);

export default function Product() {
  const { productId } = useParams();
  const cart = useSelector((state) => state.cart.list);
  const [product, setProduct] = useState(null);
  const [fav, setFav] = useState(false);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  console.log(product);

  useEffect(() => {
    fetch(`https://nowear-api.vercel.app/products?id=${productId}`)
      .then((res) => res.json())
      .then((res) => setProduct(res[0]));
  }, [productId]);

  return (
    <div className={cx('wrapper')}>
      {product && (
        <div className={cx('product')}>
          <div className={cx('carousel')}>
            <Carousel list={[product.imageUrl]}></Carousel>
          </div>

          <div className={cx('detail')}>
            <div className={cx('tags')}>
              {product.originalPrice && <div className={cx('item')}>Sale</div>}
              <div className={cx('item')}>{product.stock ? 'In stock' : 'Out of Stock'}</div>
            </div>
            <div className={cx('name')}>{product.name}</div>
            <div className={cx('prices', { off: product.originalPrice })}>
              {product.originalPrice ? (
                <>
                  <span>${product.price}</span>
                  <span>
                    <strike>${product.originalPrice}</strike>
                    &nbsp;{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              ) : (
                '$' + product.price
              )}
            </div>
            <div className={cx('size-guide')}>
              <FontAwesomeIcon icon={faRuler} /> Size Guide
            </div>
            <div className={cx('qty')}>
              <div
                className={cx('btn', { disabled: amount <= 1 })}
                onClick={() => {
                  setAmount((last) => (last - 1 < 1 ? 1 : last - 1));
                }}
              >
                -
              </div>
              <div className={cx('num')}>{amount}</div>
              <div
                className={cx('btn', { disabled: amount >= 20 })}
                onClick={() => {
                  setAmount((last) => (last + 1 > 20 ? 20 : last + 1));
                }}
              >
                +
              </div>
            </div>
            <div className={cx('buttons')}>
              <div className={cx('item')} onClick={() => dispatch(add({ ...product, amount: amount }))}>
                <FontAwesomeIcon icon={faCartShopping} /> <span>Add to cart</span>
              </div>
              <div className={cx('item')}>
                <span>Buy it now</span>
              </div>
              <div
                className={cx('item', { fav: fav })}
                onClick={() => {
                  setFav((fav) => !fav);
                }}
              >
                <FontAwesomeIcon icon={faHeart} /> <span>Wishlist{fav && 'ed'}</span>
              </div>
            </div>
            <div className={cx('description')}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem explicabo aperiam minus excepturi maxime
              dolor libero adipisci pariatur optio! Laborum porro, impedit quia illum amet voluptates mollitia fugiat
              consequuntur voluptate, et facere necessitatibus nemo ipsum provident quo cum voluptatum. Culpa nihil
              sapiente perferendis tempore et dolore molestias facilis, veniam pariatur.
            </div>

            <div className={cx('more')}>
              <table border={1} cellSpacing={0} cellPadding={8}>
                <tr>
                  <th>Vendor</th>
                  <td>{product.brandName}</td>
                </tr>
                {/* <tr>
                  <th>Product type</th>
                  <td>{product.type}</td>
                </tr> */}
                {/* <tr>
                  <th>Tags</th>
                  <td className={cx('tags')}>
                    {product.tags.map((tag) => {
                      return <span key={tag}>{tag}</span>;
                    })}
                  </td>
                </tr> */}
                <tr>
                  <th>Collections</th>
                  <td className={cx('collections')}>
                    {/* {product.collections.map((col) => {
                      return <span key={col}>{col}</span>;
                    })} */}
                    {product.category}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
