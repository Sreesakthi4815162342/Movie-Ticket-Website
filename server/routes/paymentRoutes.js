const { paymentFunction } = require('../controllers/paymentController')
const { authUser } = require('../middleware/authUser')

const paymentRouter=require('express').Router()

paymentRouter.post("/stripe-checkout",authUser,paymentFunction)

module.exports={
    paymentRouter
}