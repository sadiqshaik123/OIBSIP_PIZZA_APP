import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../components/Error';
import Loading from '../components/Loading'
import { getUserOrders } from '../actions/orderActions';


export default function Ordersscreen() {
    const dispatch = useDispatch();
    const orderstate = useSelector(state=> state.getUserOrdersReducer)
    const {orders, error, loading}=orderstate
    useEffect(()=>{
        dispatch(getUserOrders())
    },[])
  return (
    <div>
        <h2 style={{fontSize:'35px',backgroundColor:'#004b7a', color:'white'}}>MY ORDERS</h2>
        <div className='row' >
            {loading && (<Loading/>)}
            {error && (<Error error='Something Went Wrong'/>)}       
            {orders && orders.map(order=>{
                return <div className='col-md-8 mt-5 shadow-lg p-3 mb-2' style={{backgroundColor:'white', marginLeft:'305px'}}>
                    <div className='flex-container shadow-lg p-3 mb-2  rounded text-left w-100 m-1' style={{backgroundColor:'#004b7a', color:'white'}}>
                        <div>
                            <h1 style={{fontSize:'25px'}}>ITEMS</h1>
                            {order.orderItems.map(item=>{
                                return <div>
                                    <h1><li>{item.name}[{item.varient}]* {item.quantity}= ₹{item.price} INR</li></h1>

                                </div>
                            })}
                        </div>
                        <div className='text-left w-200 m-2' style={{paddingLeft:'10px'}}>
                            <h1 style={{fontSize:'25px'}}>ORDER DETAILS</h1>
                            <h1>Order Amount : {order.orderAmount}</h1>
                            <h1>Date: {order.createdAt.substring(0,10)}</h1>
                            <h1>Order ID: {order._id}</h1>
                        </div>
                        <div className='text-left w-200 m-2' style={{paddingLeft:'10px'}}>
                            <h1 style={{fontSize:'25px'}}>CUSTOMER DETAILS</h1>
                            <h1>Name : {order.name}</h1>
                            <h1>Email: {order.email}</h1>
                            <h1>Transaction ID: {order.transactionId}</h1>
                        </div>
                    </div>

                </div>
            })} 

        </div>
    </div>
  )
}
