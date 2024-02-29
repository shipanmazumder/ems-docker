import { createStore, applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// creating store
// export const store = createStore(
//   rootReducer,
//   initalState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
let composeEnhancers = compose;
if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
export const store = createStore(rootReducer,initalState, composeEnhancers(
    applyMiddleware(...middleware)
));

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
