const Stripe=require('stripe')
const { bookingModel } = require('../model/bookingModel')

const stripe=new Stripe(process.env.STRIPE_SECRETE)

const paymentFunction=async(req,res)=>{
    try {
        const {products}=req.body
        if(!products || !Array.isArray(products) || products.length === 0){
            return res.status(400).json({error:'No products received'})
        }

        const lineItems=products.map((product)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:`${product.movie.title} | ${product.movie.theater} | ${product.movie.location} | ${product.movie.time} | ${product.movie.date}`,
                    images:[product.movie.image]
                },
                unit_amount:Math.round(product.movie.price*100)
            },
            quantity:1
        }))

        const session=await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:lineItems,
            mode:'payment',
            success_url:`${process.env.FRONTEND_URL}/payment/success`,
            cancel_url:`${process.env.FRONTEND_URL}/payment/failed`
        })

        res.status(200).json({
            success:true,sessionId:session.id
        })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || 'Internal server error'})
    }
}

module.exports={
    paymentFunction
}