const express = require('express')
const expressUpload = require('express-fileupload')
const bodyParser = require("body-parser")
const cors = require('cors')
const modles = require('./models')
const { existsSync, mkdirSync } = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

existsSync(path.join(__dirname, '/image/products')) || mkdirSync(path.join(__dirname, '/image/products'))
existsSync(path.join(__dirname, '/image/users')) || mkdirSync(path.join(__dirname, '/image/users'))

app.use(cors())
app.use(expressUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/v1', require('./router/router')(modles))

app.use('/image', express.static('./image'))

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running.. is ${server.address().port}`)
})
