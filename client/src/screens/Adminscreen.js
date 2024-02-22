import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success'
import { getAllPizzas } from '../actions/pizzaActions';
import { FaTrash } from "react-icons/fa";
import { addPizza } from '../actions/pizzaActions';
import { deletePizza } from '../actions/pizzaActions';
import { deliverOrder, getAllOrders } from '../actions/orderActions'
import { deleteUser, getAllUsers } from '../actions/userActions';




function Adminscreen() {
    const userState = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userState;
    const dispatch = useDispatch();

    const pizzasstate = useSelector((state) => state.getAllPizzasReducer)
    const allOrdersState = useSelector((state) => state.allUserOrdersReducer);

    const { success, loading, pizzas, error } = pizzasstate;


    const [name, setName] = useState("")
    const [regularprice, setregularprice] = useState("")
    const [mediumprice, setmediumprice] = useState("");
    const [largeprice, setlargeprice] = useState("");
    const [image, setimage] = useState("")
    const [description, setdescription] = useState("")
    const [category, setcategory] = useState("")
    const { orders, } = allOrdersState;
    const userState1 = useSelector((state) => state.getAllUsersReducer);
    const { users } = userState1;






    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = '/';
        }
        dispatch(getAllPizzas());
        dispatch(getAllOrders());
        dispatch(getAllUsers())
    }, []);

    useEffect(() => {
        if (success) {
            setName("")
            setregularprice("")
            setmediumprice("")
            setlargeprice("")
            setimage("")
            setdescription("")
            setcategory("")
        }
    }, [success])

    function formHandler(e) {
        e.preventDefault();
        const pizza = {
            name,
            image,
            description,
            category,
            prices: {
                Regular: regularprice,
                Medium: mediumprice,
                Large: largeprice

            }
        }
        console.log(pizza);
        dispatch(addPizza(pizza))
    }

    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-md-10'>



                    <h2 style={{ fontSize: '35px', backgroundColor: '#004b7a', color: 'White' }}>Welcome to the admin dashboard!</h2>
                    {loading && (< Loading />)}
                    {error && (<Error error='Something  went Wrong' />)}
                    <div>
                        <h2 style={{ fontSize: '50px', backgroundColor: '#004b7a', color: 'yellow' }}>Users List</h2>
                        <table className='table table-striped text-white bg-dark table-border'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <FaTrash className="icon m-1"
                                                    style={{ color: "red", cursor: "pointer" }}
                                                    onClick={() => {
                                                        dispatch(deleteUser(user._id));
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>




                        <hr style={{ borderTopWidth: '3px', borderTopStyle: 'solid', borderTopColor: 'white' }} />

                        <h2 style={{ fontSize: '50px', backgroundColor: '#004b7a', color: 'yellow' }}>Pizzas List</h2>


                        <table className='table table-striped text-white bg-dark table-border'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>Name</th>
                                    <th>Prices</th>
                                    <th>Category</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pizzas && pizzas.map(pizza => {
                                    return <tr>
                                        <td>-{pizza.name}</td>
                                        <td>
                                            <li>Regular : {pizza.prices[0]['Regular']}<br /></li>
                                            <li>Medium : {pizza.prices[0]['Medium']}<br /></li>
                                            <li>Large : {pizza.prices[0]['Large']}</li>


                                        </td>
                                        <td>{pizza.category}</td>
                                        <td>
                                            <FaTrash className="icon m-1" style={{ color: 'red' , cursor: "pointer" }} onClick={() => { dispatch(deletePizza(pizza._id)) }}/>
                                        </td>

                                    </tr>

                                })}

                            </tbody>


                        </table>
                        <hr style={{ borderTopWidth: '3px', borderTopStyle: 'solid', borderTopColor: 'white' }} />




                        <h2 style={{ fontSize: '50px', backgroundColor: '#004b7a', color: 'yellow' }}>Add Pizza</h2>
                        {loading && (<Loading />)}
                        {success && (<Success success="New Pizza Added Successfully" />)}
                        {error && (<Error error='Something went wrong' />)}
                        <form onSubmit={formHandler} >
                            <input className='form-control' type='text' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                            <input className='form-control' type='text' placeholder='Regular Varient Price' value={regularprice} onChange={(e) => { setregularprice(e.target.value) }} />
                            <input className='form-control' type='text' placeholder='Medium Varient Price' value={mediumprice} onChange={(e) => { setmediumprice(e.target.value) }} />
                            <input className='form-control' type='text' placeholder='Large Varient Price' value={largeprice} onChange={(e) => { setlargeprice(e.target.value) }} />
                            <input className='form-control' type='text' placeholder='Category - veg/nonveg(small letters)' value={category} onChange={(e) => { setcategory(e.target.value) }} />
                            <input className='form-control' type='text' placeholder='Description' value={description} onChange={(e) => { setdescription(e.target.value) }} />
                            <input className='form-control' type='text' placeholder='Image URL' value={image} onChange={(e) => { setimage(e.target.value) }} />
                            <button className='btn mt-3 mb-3' type='submit'> ADD PIZZA</button>
                        </form>
                        <hr style={{ borderTopWidth: '3px', borderTopStyle: 'solid', borderTopColor: 'white' }} />

                        <h2 style={{ fontSize: '50px', backgroundColor: '#004b7a', color: 'yellow' }}>Orders Details</h2>
                        <table className='table table-striped text-white bg-dark table-border'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map(order => {
                                    return <tr>
                                        <td>{order._id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.email}</td>
                                        <td>{order.orderAmount}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>
                                            {order.isDelivered ? (<h1 style={{ color: '#03ff5b' }}>Delivered</h1>) : (<button className='btnlog' onClick={() => {
                                                dispatch(deliverOrder(order._id));
                                            }}>Deliver</button>)}
                                        </td>


                                    </tr>

                                })}

                            </tbody>


                        </table>
                        <hr style={{ borderTopWidth: '3px', borderTopStyle: 'solid', borderTopColor: 'white' }} />

                    </div>




                </div>
            </div>
        </div>
    );
}

export default Adminscreen;
