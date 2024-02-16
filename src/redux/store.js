import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cartSlice";
import { favoritesSlice } from "./features/favoritesSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// const isBrowser = typeof window !== 'undefined';

const persistConfig = {
  key: "root",
  storage,
  //storage: isBrowser ? storage : undefined,
  whitelist: ["favorites", "cart"],
};

const rootReducer = combineReducers({
  favorites: favoritesSlice.reducer,
  cart: cartSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);
