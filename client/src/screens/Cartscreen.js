import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa"
import { addToCart } from '../actions/cartActions'
import { deleteFromCart } from '../actions/cartActions'
import Checkout from '../components/Checkout'


export default function Cartscreen() {
    const cartstate = useSelector(state => state.cartReducer)
    const cartItems = cartstate.cartItems
    var subtotal = cartItems.reduce((x, item) => x + item.price, 0).toFixed(2);
    var GST = (subtotal*0.05).toFixed(2);
    var Total= (parseFloat(subtotal) + parseFloat(GST)).toFixed(2)
    const dispatch = useDispatch()
    return (
        <div >
            <div className='row justify-content-center'>
            
                <div className=' col-md-6 ' style={{overflowY:'auto', height:'550px' }}>
                    
                    {cartItems.map(item => {
                        return <div className='flex-container shadow-lg p-3 mb-2 bg-white rounded' >
                            <div >
                                <FaTrash className="iconstrash" onClick={() => { dispatch(deleteFromCart(item)) }} />

                            </div>
                            <div className='m-1 w-100'>
                                <img src={item.image} style={{ height: '115px' }} />

                            </div>

                            <div style={{ marginLeft: '2rem', textAlign: "right" }} className='m-1 w-100 ' >
                                <h1>{item.name}{"  -  "}[{item.varient}]</h1>
                                <h1>Price : {item.prices[0][item.varient]}{" "}*{" "}{item.quantity}{" "}={" "}{item.price}</h1>
                                <div className='row ' style={{ marginTop: '10px' }}>
                                    <h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right' }}>
                                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                                        <div className="border-black" style={{ borderRight: '1px solid black', paddingRight: '10px', paddingLeft: '10px', paddingTop: '5px', paddingBottom: '5px' }} onClick={() => { dispatch(addToCart(item, item.quantity + 1, item.varient)) }}>
                                            <FaPlus className="iconsplus" />
                                        </div>
                                        <div className="border-black" style={{ borderLeft: '1px solid black', paddingLeft: '10px', paddingRight: '10px', paddingTop: '5px', paddingBottom: '5px' }} >
                                            <b style={{ marginTop: '5px' }}>{item.quantity}</b>
                                        </div>

                                        <div className="border-black" style={{ borderLeft: '1px solid black', paddingLeft: '10px', paddingRight: '10px', paddingTop: '5px', paddingBottom: '5px' }} onClick={() => { dispatch(addToCart(item, item.quantity - 1, item.varient)) }}>
                                            <FaMinus className="iconsminus" />
                                        </div>
                                    </h1>

                                </div>
                            </div>

                        </div>
                    })}


                </div>
                <div className='col-md-4 shadow-lg p-3 mb-2 bg-white rounded' style={{height:'550px'}}>
                    <h2 style={{ fontSize: '45px' }}>Order Summary </h2>
                    <div className='flex-container' style={{marginTop:'30px'}} >
                        <div className='m-1 w-100' style={{textAlign:'left'}}>
                            <h1> SubTotal</h1>

                        </div>
                        <div className='m-1 w-100' style={{textAlign:'right'}}>
                            <h1>₹  {subtotal} INR</h1>

                        </div>

                    </div>
                    <hr/>
                    <div className='flex-container' style={{marginTop:'30px'}} >
                        <div className='m-1 w-100'style={{textAlign:'left'}} >
                            <h1> GST (5%)</h1>

                        </div>
                        <div className='m-1 w-100' style={{textAlign:'right'}}>
                            <h1>₹  {GST} INR </h1>

                        </div>

                    </div>
                    <hr/>
                    <div className='flex-container' style={{marginTop:'30px'}} >
                        <div className='m-1 w-100' style={{textAlign:'left', color:'gray'}}>
                            <h1 > Total</h1>

                        </div>
                        <div className='m-1 w-100' style={{textAlign:'right'}}>
                            <h1>&ensp;</h1>

                        </div>

                    </div>
                    <div className='flex-container'  >
                        <div className='m-1 w-100' style={{textAlign:'left'}}>
                            <h1> SubTotal</h1>

                        </div>
                        <div className='m-1 w-100' style={{textAlign:'right'}}>
                            <h1>₹  {Total} INR</h1>

                        </div>

                    </div>
                    <hr/>
                    <h2 style={{ fontSize: '35px' }}>Total : ₹  {Total} INR </h2>
                    <hr/>
                    <Checkout subTotal={Total}/>
                    
                    

                </div>

            </div>
        </div>
    )
}
