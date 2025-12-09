import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import productsReducer from './productsSlice';

// 持久化配置
const persistConfig = {
  key: 'root',                           
  storage,                               
  throttle: 1000, // 防抖：1s 内的多个 action 只保存一次
};

// 包装 reducer
const persistedReducer = persistReducer(persistConfig, productsReducer);

export const store = configureStore({
  reducer: {
    products: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
	   serializableCheck: false,
  })
});

// 创建 persistor
export const persistor = persistStore(store);