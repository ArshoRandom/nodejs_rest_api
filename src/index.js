require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const {logger} = require('./util/logger');
const userRoute = require('./route/userRoute').route;
const authRoute = require('./route/authRoute').route;
const postRoute = require('./route/postRoute').route;

const app = express();

app.use(logger)

app.use(fileUpload())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/v1/posts',postRoute);
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/users',userRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
})
