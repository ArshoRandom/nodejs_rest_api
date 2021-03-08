require('dotenv').config();
const express = require('express');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const {logger} = require('./util/logger');
const userRoute = require('./route/userRoute');
const authRoute = require('./route/authRoute');
const postRoute = require('./route/postRoute');

const app = express();

app.use(logger)
app.use(passport.initialize());
require('./middlewear/passport')(passport);

app.use(fileUpload())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/v1/posts',postRoute);
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/users',userRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
})
