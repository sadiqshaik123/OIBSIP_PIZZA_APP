export const getAllPizzasReducer = (state = { pizzas: [] }, action) => {
    switch (action.type) {
      case "GET_PIZZAS_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "GET_PIZZAS_SUCCESS":
        return {
          pizzas: action.payload,
          loading: false,
        };
      case "GET_PIZZAS_FAIL":
        return {
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  export const addPizzaReducer = (state = { }, action) => {
    switch (action.type) {
      case "ADD_PIZZA_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "ADD_PIZZA_SUCCESS":
        return {
          loading: false,
          success:true,
        };
      case "ADD_PIZZA_FAIL":
        return {
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  }