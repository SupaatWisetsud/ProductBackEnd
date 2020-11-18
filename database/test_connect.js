const Sequelize = require('sequelize')

const sequelize = new Sequelize('db_product', 'root', 'banana', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.log(err);
})