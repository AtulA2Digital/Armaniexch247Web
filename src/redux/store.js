import { thunk } from "redux-thunk";
import reducers from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers = composeWithDevTools({});
const rootReducer = reducers;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
