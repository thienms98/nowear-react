import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { amountById } from '../../redux/reducers/cart';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
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
          {/* <div className={cx('cell')}> </div> */}
        </div>

        {cart.map((product, index) => {
          return <CartProduct product={product} />;
        })}

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
      </table>
    </div>
  );
}

function CartProduct({ product }) {
  const { id, name, price, amount } = product;
  const dispatch = useDispatch();
  return (
    <div className={cx('row')}>
      <div className={cx('cell')}>{name}</div>
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
    </div>
  );
}
