const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');


app.use(cors());
app.options('*', cors());


//Middleware
app.use(express.json());
app.use(morgan('tiny'));


const api = process.env.API_URL;
const PORT = 3000;


// Routers
const mesuresRouter = require('./routers/mesure');
const sortiesRouter = require('./routers/sortie');
const tablesRouter = require('./routers/table');


app.use(`${api}/mesures`, mesuresRouter);
app.use(`${api}/sorties`, sortiesRouter);
app.use(`${api}/tables`, tablesRouter);




app.get(`${api}/`, (req, res)=>{
    res.send('hello world');
});



// Server
app.listen(PORT, () =>  {
    console.log(api);
    console.log('Server is running http://localhost:3000');
});