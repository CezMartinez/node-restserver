const config = require('./config/config')

const express = require('express')
const mongoose = require('mongoose');
const path = require('path');

const app = express()

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


//configuracion de rutas
app.use(require('./routes/index').app)

//habilitar public
app.use(express.static(path.resolve(__dirname, "../public")))

// console.log(__dirname + "../public")
// console.log(path.resolve(__dirname, "../public"))


mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("conectado a la base de datos")
    })
    .catch(error => {
        throw error
    });



app.listen(process.env.PORT, () => {
    console.log("escuchando puerto", process.env.PORT);
})