/**
 * Redux Store
 */
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../reducers";
import RootSaga from "../sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middlewares = [sagaMiddleware];

export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(compose(applyMiddleware(...middlewares)))
  );

  sagaMiddleware.run(RootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  store.subscribe(() => {
    store.getState();
  });

  return store;
}

export const store = configureStore();
