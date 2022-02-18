const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotEnv = require('dotenv').config();
const database = require("./database/database");

const defaultController = require("./controllers/defaultController");

const exampleRoutes = require("./routes/exampleRoutes");

//App config
const app = express();
const PORT = process.env.PORT || 5000;
const BASE_PATH = process.env.BASE_PATH || "";
const IS_DEV_ENV = process.env.NODE_ENV == "development";

//Log
app.use(morgan(IS_DEV_ENV ? "dev" : "tiny"));

//Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ALLOWED_HOST }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((res, req, next) => 
{
    res.header('Access-Control-Allow-Header', 'Origin, Content-Type, Accept, Authorization');
    next();
});

//Static routes
app.use(BASE_PATH + "/static", express.static(__dirname + '/static'));

//DB connection
app.use(database.testConnection);

//API routes
app.use(BASE_PATH + "/example", exampleRoutes);

app.use(defaultController.defaultRoute);

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    .send({
        message: error.message
    });
});

//Listening
app.listen(PORT, () => console.log("Listening on :" + PORT));