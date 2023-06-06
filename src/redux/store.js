import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import helloSagas from './sagas';

import cartReducer from './reducers/cart';

const sagaMiddleware = createSagaMiddleware(helloSagas);

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: [sagaMiddleware],
});
