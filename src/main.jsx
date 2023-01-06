import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
/* -------------------------------------------------------------------------- */
/*                                    REDUX                                   */
/* -------------------------------------------------------------------------- */
import authReducer from "./state/index";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
/* -------------------------------------------------------------------------- */
/*                            REDUX - localstorage                            */
/* -------------------------------------------------------------------------- */
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    {/* PersistGate delays the rendering of your app's UI until your persisted state has been retrieved and saved to redux. */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
