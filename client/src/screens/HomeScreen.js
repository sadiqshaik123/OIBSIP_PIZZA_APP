import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pizza from '../components/pizza';
import { getAllPizzas } from '../actions/pizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
export default function HomeScreen() {
    const dispatch = useDispatch()

    const pizzasstate = useSelector((state) => state.getAllPizzasReducer)

    const {loading, pizzas, error} = pizzasstate;

    useEffect( () => {
        dispatch(getAllPizzas())
    },[dispatch])
  return (
    <div>
        <div className='row justify-content-center'>
        {loading ? (
                    <Loading/>
                ) : error ? (
                    <Error error="Something went wrong"/>
                ) : (
                    
                    pizzas.map((pizza)=>{
                        return <div className='col-md-3 m-3'key={pizza._id}>
                            <div>
                                <Pizza pizza={pizza}/>
                            </div>
                        </div>
        
                    })

                )}
        </div>
    </div>
  )
}
