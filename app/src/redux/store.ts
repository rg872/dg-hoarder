import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

export const store = createStore(
  combineReducers({ router: routerReducer }),
  compose(applyMiddleware(routerMiddleware))
);

export const history = createReduxHistory(store);
