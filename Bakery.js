import { configureStore } from "@reduxjs/toolkit";
import { bindActionCreators } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICREAM_ORDERED = "ICREAM_ORDERED";
const ICREAM_RESTOCKED = "ICREAM_RESTOCKED";

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

const OrderIceCream = () => {
  return {
    type: ICREAM_ORDERED,
    payload: 1,
  };
};

const RestockIceCream = (qty) => {
  return {
    type: ICREAM_RESTOCKED,
    payload: qty,
  };
};

const initialCakeState = {
  cakeCount: 10,
};

const initialICreamState = {
    iceCreamCount: 20,    
};

const CakeReducer = (state = initialCakeState, action) => {
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

const ICreamReducer = (state = initialICreamState, action) => {
  switch (action.type) {    
    case ICREAM_ORDERED:
      return {
        ...state,
        iceCreamCount: state.iceCreamCount - action.payload,
      };
    case ICREAM_RESTOCKED:
      return {
        ...state,
        iceCreamCount: state.iceCreamCount + action.payload,
      };
    default:
      return state;
  }
};

const rootReduceer = combineReducers({ 
    cake: CakeReducer, 
    iceCream: ICreamReducer 
});

const store = configureStore({ reducer: rootReduceer });
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {
    console.log("Updated state", store.getState());
});

const actions = bindActionCreators(
  { OrderCake, RestockCake, OrderIceCream, RestockIceCream },
  store.dispatch
);

actions.OrderCake();
actions.OrderCake();
actions.OrderCake();
actions.RestockCake(5);

actions.OrderIceCream();
actions.OrderIceCream();
actions.OrderIceCream();
actions.RestockIceCream(5);

unsubscribe();