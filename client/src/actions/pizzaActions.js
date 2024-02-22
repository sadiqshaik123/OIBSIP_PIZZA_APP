import axios from "axios";
export const getAllPizzas = () => async dispatch => {
    
    try {
        dispatch({ type: 'GET_PIZZAS_REQUEST' })
        const response = await axios.get('/api/pizzas/getallpizzas')
        console.log(response);
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: response.data })
    }
    catch (error) {
        dispatch({ type: 'GET_PIZZAS_FAIL', payload: error })

    }

}

export const addPizza=(pizza)=> async dispatch=>{
    
    try {
        dispatch({type:'ADD_PIZZA_REQUEST'})
        const response = await axios.post('/api/pizzas/addpizza', {pizza});
        console.log(response);
        dispatch({type:'ADD_PIZZA_SUCCESS'})
        window.location.href = "/admin ";
        
    } catch (error) {
  
  
        dispatch({type:'ADD_PIZZA_FAILED' , payload: error})
        
    }
}

export const  deletePizza=(pizzaid)=> async dispatch=>{

    try {
        const response= await axios.post('/api/pizzas/deletepizza',{pizzaid});
        alert('Pizza Deleted Successfully');
        console.log(response)
        window.location.reload()

        
    } catch (error) {
        alert('Something went wrong');
        console.log(error)
        
    }
}