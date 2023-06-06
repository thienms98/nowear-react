import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { amountById, remove } from '../../redux/reducers/cart';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

export default function Cart() {
  const cart = useSelector((state) => state.cart.list);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>Your shopping cart</div>
      <table className={cx('list')}>
        <div className={cx('row', 'header')}>
          <div className={cx('cell')}> Product</div>
          <div className={cx('cell')}> Price</div>
          <div className={cx('cell')}> Quantity</div>
          <div className={cx('cell')}> Total</div>
          <div className={cx('cell')}> </div>
        </div>

        {cart.length > 0 ? (
          cart.map((product, index) => {
            return <CartProduct product={product} key={index} index={index} />;
          })
        ) : (
          <h2>There is nothing on your cart</h2>
        )}

        {cart.length > 0 && (
          <div className={cx('row')}>
            <div className={cx('cell')}></div>
            <div className={cx('cell')}></div>
            <div className={cx('cell')}>Summary</div>
            <div className={cx('cell')}>
              $
              {cart.reduce((prev, current) => {
                return prev + current.amount * current.price;
              }, 0)}
            </div>
          </div>
        )}
      </table>

      {cart.length > 0 && (
        <div className={cx('checkout')}>
          <Link to="/checkout">Check out</Link>
        </div>
      )}

      <div className={cx('button')}>
        <Link to="/collection">
          <h3>Continue Shopping</h3>
        </Link>
      </div>
    </div>
  );
}

function CartProduct({ product, index }) {
  const { id, imageUrl, name, price, amount } = product;
  const dispatch = useDispatch();
  return (
    <div className={cx('row')}>
      <div className={cx('cell')}>
        <img src={imageUrl} alt="" /> {name}
      </div>
      <div className={cx('cell')}>{`$${price}`}</div>
      <div className={cx('cell')}>
        <div
          className={cx('btn', { disabled: amount <= 1 })}
          onClick={() => {
            dispatch(amountById({ id, increament: -1 }));
          }}
        >
          -
        </div>
        <div className={cx('num')}>
          <input
            type="number"
            onChange={(e) => {
              dispatch(amountById({ id, amount: e.target.value }));
            }}
            value={amount}
          />
        </div>
        <div
          className={cx('btn', { disabled: amount >= 20 })}
          onClick={() => {
            dispatch(amountById({ id, increament: 1 }));
          }}
        >
          +
        </div>
      </div>
      <div className={cx('cell')}>{`$${price * amount}`}</div>
      <div
        className={cx('cell')}
        onClick={() => {
          dispatch(remove({ index }));
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}
