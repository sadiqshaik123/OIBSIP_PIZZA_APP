import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../actions/orderActions';
import Success from '../components/Success';
import Error from '../components/Error';
import Loading from '../components/Loading'

export default function Checkout({ subTotal }) {

const orderstate= useSelector((state)=>state.placeOrderReducer)
const{loading,error,success}=orderstate
  const dispatch = useDispatch();
  const [showRazorpayForm, setShowRazorpayForm] = useState(false);

  const handlePayment = () => {
    setShowRazorpayForm(true);
  };

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const options = {
          key: 'rzp_test_3mHYz2pieiBUOI',
          amount: subTotal * 100,
          currency: 'INR',
          name: 'Sadiqs Pizza',
          description: 'Payment for your order',
          handler: function (response) {
            dispatch(placeOrder(response, subTotal));
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };

      document.body.appendChild(script);
    };

    if (showRazorpayForm) {
      loadRazorpay();
    }
  }, [dispatch, showRazorpayForm, subTotal]);

  return (
    <div>
      {loading && (<Loading/>)}
      {success && (<Success success='Your Order Placed Successfully'/>)}
      {error && (<Error error='Something Went Wrong'/>)}
      <button className='btncheck' onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}
