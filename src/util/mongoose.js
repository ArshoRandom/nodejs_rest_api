const mongoose = require('mongoose');
const chalk = require('chalk')
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useCreateIndex:true})
    .then(() => console.log(chalk.green("Database successfully connected")));

module.exports = mongoose;
