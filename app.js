const mongoose = require('mongoose');
const express = require('express')
const app = express()
const cors = require("cors");

//to hash the password 
const bcrypt = require('bcryptjs');

const port = process.env.PORT || 3000;
// mongoose.connect('mongodb://localhost:27017/GroceryStore', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Database CONNECTED")
// });
// mongoose.connect('mongodb+srv://maruthi:maruthi123@cluster0.92msomw.mongodb.net/test', {
//     useNewUrlParser: true,
// useUnifiedTopology: true,
// }).then(() => {
//     console.log("Database CONNECTED")
// });
mongoose.connect('mongodb+srv://maruthi:maruthi123@cluster0.92msomw.mongodb.net/GroceryApp?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log("Database CONNECTED")
});

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://maruthi:<password>@cluster0.92msomw.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });


//Middleware Interfaces
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.use(cors());


//Defining Routes

const categoryRoutes = require('./routes/product_category');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth_user');
const orderRoutes = require('./routes/order');

const manageorderRoute = require('./routes/manage_orders');


//Using routes
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes);

app.use('/api/manageorder', manageorderRoute);


app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => res.send('Server Started!'));


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
    // app.listen(port, () => console.log('Example app listening a))