export const placeOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case "PLACE_ORDER_REQUEST":
        return {
          loading: true,
        };
      case "PLACE_ORDER_SUCCESS":
        return {
          loading: false,
          success: true,
        };
      case "PLACE_ORDER_FAIL":
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const getUserOrdersReducer = (state = {orders: [] }, action) => {
    switch (action.type) {
      case "GET_USER_ORDERS_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "GET_USER_ORDERS_SUCCESS":
        return {
          orders: action.payload,
          loading: false,
        };
      case "GET_USER_ORDERS_FAIL":
        return {
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  }

  export const allUserOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case "ALL_ORDER_REQUEST":
        return {
          loading: true,
          ...state,
        };
      case "ALL_ORDER_SUCCESS":
        return {
          loading: false,
          success: true,
          orders: action.payload,
        };
      case "ALL_ORDER_FAIL":
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };