import axios from "axios";
export const placeOrder = (token, subTotal) => async (dispatch, getState) => {
 
  dispatch({ type: "PLACE_ORDER_REQUEST" });
  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;
  try {
    
    const response= await axios.post('/api/orders/placeorder', {
      token,
      subTotal,
      currentUser,
      cartItems
    });
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
    console.log(response);
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAIL" });
    console.log(error)
  }
};


export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({
    type: "GET_USER_ORDER_REQUEST",
  });
  try {
    const response = await axios.post('/api/orders/getuserorders', {
      params: {
        userid: currentUser._id,
      },
    });
    console.log(response);
    dispatch({ type: "GET_USER_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USER_ORDER_FAIL", payload: error });
  }
};



export const getAllOrders = () => async (dispatch, getState) => {
  dispatch({
    type: "ALL_ORDER_REQUEST",
  });
  try {
    const response = await axios.get('/api/orders/alluserorder');
    dispatch({ type: "ALL_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ALL_ORDER_FAIL", payload: error });
  }
};
export const deliverOrder = (orderid) => async (dispatch, getState) => {
  // const currentUser = getState().loginUserReducer.currentUser;
  dispatch({
    type: "GET_ALL_ORDER_REQUEST",
  });
  try {
    await axios.post("/api/orders/deliverorder", { orderid });
    alert("Order Delivered");
    const orders = await axios.get("/api/orders/alluserorder");
    dispatch({ type: "GET_ALL_ORDER_SUCCESS", payload: orders.data });
    window.location.href = "/admin ";
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDER_FAIL", payload: error });
  }
};
