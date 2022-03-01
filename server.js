'use strict'

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

const mongoose = require('mongoose');
const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(
    express.json({ limit: "50mb" })
);
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);
app.use(cors());

/* DB Connection */
mongoose.connect(process.env.CONNECTION_STRING + process.env.DB_NAME,
    { useNewUrlParser: true },
    (err, client) => {
        if (err) console.log("DB connection error", err)
        else { console.log("DB connected") }
    })
/* DB Connection */


/* routes */
const user = require('./routes/user');
const roles = require('./routes/user-roles');
const technology = require('./routes/technology');
/* routes */


/* Express Custom Function */
require("./common/express_custom_function")(express);
/* Express Custom Function */


/* routes with static path */
app.use('/user', user);
app.use('/userRoles', roles);
app.use('/technology', technology);
/* routes with static path */


server.listen(process.env.PORT || 8300, (err) => {
    if (err) throw err;
    console.log("Server Up And Working");
});
