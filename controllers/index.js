const jwt = require('jsonwebtoken');
const path = require('path')

const SECRET = "SAT@O@ES"

module.exports = (models) => {

    const User = models.User
    const Product = models.Product

    return {
        root: (req, res) => {
            res.send("Hello World")
        },
        authentication: async (req, res) => {

            const { email, password } = req.body
            console.log(req.body);
            let user = await User.findOne({
                where: {user_email: email || '', user_password: password || ''},
                attributes: {
                    include: [],
                    exclude: ["user_password"]
                }
            })

            if(user === null) {
                res.status(401).json({
                    message: "Authentication fall"
                })
                return;
            }

            const token = jwt.sign({...user}, SECRET)
            
            res.status(200).json({
                token: token,
                message: "Authentication success"
            })
        },
        authorization: (req, res, next) => {

            const tokenBearer = req.headers.authorization || ''

            if(tokenBearer === '') {
                res.status(401).json({
                    message: "Authentication not found!!"
                })
                return    
            }

            // send data next middleware6
            // 
            // let token = req.a
            let token = tokenBearer.split(" ")[1]
            
            try {
                jwt.verify(token, SECRET, function(error, decoded) {
                    if(error) {
                        console.log(error);
                    }
                    req.authorization = decoded.dataValues
                })
                
            } catch (error) {
                console.log(error);
            }

            next()
        },
        getUsers: async (req, res) => {
            let user = await User.findAll({
                attributes: {
                    include:[],
                    exclude: ["user_password"]
                }
            });
            res.status(200).json({
                data: user
            })
        },
        getUser: async (req, res) => {
            const { id } = req.params;
            let user = await User.findOne({where: {user_no: id}})
            
            if(user === null) {
                res.status(200).json({
                    message: "user found"
                })
                return
            }

            res.status(200).json({
                user: user 
            })
        },
        createUser: () => {

        },
        getProducts: async (req, res) => {

            let products = await Product.findAll({
                include: [
                    {
                        model: User,
                        attributes: {
                            include: [],
                            exclude: ["user_password"]
                        }
                    }
                ]
            })
            // console.log(products);
            res.status(200).json({
                data: products
            })
        },
        getProduct: async (req, res) => {

            let { id } = req.params
            let product = await Product.findOne({where: {product_no: id}})

            if(product === null) {
                res.status(200).json({
                    message: "product not found!!"
                })
                return
            }

            res.status(200).json({
                product: product
            })
        },
        createProduct: async (req, res) => {

            const { product_name, product_desc, product_price } = req.body
            const { id } = req.authorization
            
            if(product_name == undefined) {
                res.status(200).json({
                    message: "Please enter product name!!"
                })   
                return
            }
            let productObject = {
                product_name: product_name,
                product_desc: product_desc || null,
                product_price: +product_price || 0,
                user_no: id,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            if (req.files !== null) {
                const image = req.files.product_image
                const pathImage = path.join(__dirname, '../image/products/' + image.name)
                
                await new Promise((resolve, reject) => {
                    image.mv(pathImage, (err) => {
                        if(err) reject(err)
                        resolve()
                    })
                }).then(() => {
                    productObject = Object.assign({}, productObject, {product_image: `http://${process.env.HOST}:${process.env.PORT}/image/products/${image.name}`})
                }).catch(error => {
                    console.log(error);
                })
                
            }
            let product = await Product.create(productObject)

            res.status(200).json({
                product: product
            })
        }
    }
}