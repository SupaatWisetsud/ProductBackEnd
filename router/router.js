const router = require('express').Router()

module.exports = (modles) => {

    const controller = require('../controllers')(modles)

    router.get("/", controller.root)

    router.post('/sign-in', controller.authentication)
    
    router.get('/user/:id', controller.getUser)
    router.get('/users', controller.authorization, controller.getUsers)

    router.get('/products', controller.getProducts)
    router.get('/product/:id', controller.getProduct)
    router.post('/product', controller.authorization, controller.createProduct)

    return router
}