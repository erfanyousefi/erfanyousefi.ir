const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const http = require("http")
require("dotenv").config();
const Routes = require("app/router/api/index");
const { autoLogin } = require("./http/middleware/auth");

module.exports = class Server {
    constructor() {
        this.createHttpServer();
        this.connectToDatabase()
        this.serverConfiguration();
        this.routingConfiguration();
    }
    createHttpServer() {
        const server = http.createServer(app);
        server.listen(process.env.PORT, err => {
            if (err) {
                console.error(`Can't run server on -port ${process.env.PORT}`);
            } else {
                console.clear()
                console.log(`runing server on -port ${process.env.PORT}`);
            }
        })
    }
    connectToDatabase() {
        mongoose.connect(process.env.DB_STRING_CON, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, err => {
            if (err) {
                console.error(`Can't connect to Database 'CoffeeDB'`);
            } else {
                console.log(`connected to  'CoffeeDB' Database`);
            }
        })
    }
    serverConfiguration() {
        app.use(express.static("public"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }))
        app.use(require("app/http/middleware/auth").autoLogin)
    }
    routingConfiguration() {
        app.use(Routes)
        app.use((req, res, next) => {
            res.status(404).json({
                status: false,
                message: "Not-Found"
            })
        })
    }

}