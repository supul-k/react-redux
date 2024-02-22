import { configureStore } from '@reduxjs/toolkit';

// const createstore = createStore;
const CAKE_ORDERED = "CAKE_ORDERED";

const OrderCake = () => {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
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
        cakeCount: state.cakeCount - action.quantity,
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

store.dispatch(OrderCake({
    type: CAKE_ORDERED,
    quantity: 1,
  }));
store.dispatch(OrderCake());
store.dispatch(OrderCake());

unsubscribe();
