import { configureStore } from '@reduxjs/toolkit';
import { bindActionCreators } from '@reduxjs/toolkit';

// const createstore = createStore;
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

const OrderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
};

const RestockCake = (qty) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};

const initialState = {
  cakeCount: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        cakeCount: state.cakeCount - action.payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        cakeCount: state.cakeCount + action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({ reducer });
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated state", store.getState());
});

// store.dispatch(OrderCake({
//     type: CAKE_ORDERED,
//     quantity: 1,
//   }));
// store.dispatch(OrderCake());
// store.dispatch(OrderCake());
// store.dispatch(RestockCake(5));

const actions = bindActionCreators({ OrderCake, RestockCake }, store.dispatch);
actions.OrderCake();
actions.OrderCake();
actions.OrderCake();
actions.RestockCake(5);

unsubscribe();
