const express = require("express");
const router = express.Router();
const Pizza = require('../models/pizzaModel')
router.get("/getallpizzas", async(req,res)=>{
    try{
        const pizzas = await Pizza.find({})
        res.send(pizzas)

    }
    catch(error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/addpizza', async(req,res)=>{
    const pizza = req.body.pizza;
    try {
        const newpizza= new Pizza({
            name:pizza.name,
            image:pizza.image,
            varients: ['Regular', 'Medium', 'Large'],
            description:pizza.description,
            category:pizza.category,
            prices : [pizza.prices]
        })
        await newpizza.save()
        res.send('New Pizza Added Successfully')
        
    } catch (error) {
        return res.status(400).json({message: error})
        
    }

});
router.post('/deletepizza', async(req,res)=>{
    const pizzaid = req.body.pizzaid;
    try {
        const res=await Pizza.findOneAndDelete({_id : pizzaid})
        res.send('Pizza Deleted Successfully')
        
    } catch (error) {
        return res.status(400).json({message: error})
        
    }

});

module.exports = router;