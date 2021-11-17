const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


app.use(cors());
app.options('*', cors());


//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);


const api = process.env.API_URL;
const PORT = 3000;


// Routers
const mesuresRouter = require('./routers/mesure');
const sortiesRouter = require('./routers/sortie');
const tablesRouter = require('./routers/table');
const capteursRouter = require('./routers/capteur');
const authRouter = require('./routers/auth');


app.use(`${api}/mesures`, mesuresRouter);
app.use(`${api}/sorties`, sortiesRouter);
app.use(`${api}/tables`, tablesRouter);
app.use(`${api}/capteurs`, capteursRouter);
app.use(`${api}/auth`, authRouter);



app.get(`${api}/`, (req, res)=>{
    res.send('hello world');
});



// Server
app.listen(PORT, () =>  {
    console.log(api);
    console.log('Server is running http://localhost:3000');
});