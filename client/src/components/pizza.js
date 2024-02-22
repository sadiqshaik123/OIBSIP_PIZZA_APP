import React, { useState } from 'react'
import vegImage from '../images/veg-icon.svg'
import nonVegImage from '../images/non-veg-icon.svg'
import { Modal } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart} from '../actions/cartActions'


export default function Pizza({ pizza }) {
    const [quantity, setquantity] = useState(1)
    const [varient, setvarient] = useState('Regular')
    const vegIcon = <img src={vegImage} alt="VegImage" className="icon" />
    const nonVegIcon = <img src={nonVegImage} alt="NonvegImage" className="icon" />;
    const icon = pizza.category === 'veg' ? vegIcon : nonVegIcon
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch=useDispatch()
    function addtocart(){
        dispatch(addToCart(pizza, quantity, varient))
    }
    return (
        <div className='shadow-lg p-3 mb-5 bg-white rounded' key={pizza._id}>
            <div onClick={handleShow}>
                <div className="flex-container">
                    <div className='m-10 w-100'>
                        <h1>{pizza.name}</h1>
                    </div>
                    <div className='m-10 w-20'>
                        {icon}
                    </div>
                </div>
                <img src={pizza.image} className="img-fluid" style={{ height: '200px', width: '400px' }} />
            </div>
            <div className="flex-container">
                <div className='w-100 m-1' >
                    <p>Size</p>
                    <select className='form-control ' value={varient} onChange={(e) => { setvarient(e.target.value) }} >
                        {pizza.varients.map(varient => {
                            return <option value={varient}>{varient}</option>

                        })}
                    </select>
                </div>
                <div className='w-100 m-1'>
                    <p>Quantity</p>
                    <select className='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }} >
                        {[...Array(10).keys()].map((x, i) => {
                            return <option value={i + 1}>{i + 1} </option>
                        })}
                    </select>

                </div>

            </div>
            <div className='flex-container mt-1'>
                <div className='m-10 w-100'>
                    <h1 className='mt-1'>Price :  ₹ {pizza.prices[0][varient] * quantity} Rs/-</h1>
                </div>
                <div className='m-10 w-100'>
                    <button className='btn' onClick={addtocart}> ADD TO CART</button>

                </div>

            </div>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header >
                    <Modal.Title >{pizza.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={pizza.image} style={{width:'350px'} }/>

                    </div>
                   
                    <p>{icon}</p>
                    <p>{pizza.description}</p>
                    
                </Modal.Body>

                <Modal.Footer>
                    <button className='btn' onClick={handleClose}> Close</button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
