const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

//swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app.use(cors());
app.options('*', cors());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);


const api = process.env.API_URL;



// Routers
const mesuresRouter = require('./routers/mesure');
const sortiesRouter = require('./routers/sortie');
const tablesRouter = require('./routers/table');
const capteursRouter = require('./routers/capteur');
const usersRouter = require('./routers/users');
const authRouter = require('./routers/auth');


app.use(`${api}/mesures`, mesuresRouter);
app.use(`${api}/sorties`, sortiesRouter);
app.use(`${api}/tables`, tablesRouter);
app.use(`${api}/capteurs`, capteursRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/auth`, authRouter);


app.get(`${api}/:name`, (req, res)=>{
    res.send('hello ' + req.params.name);
});



// Server
app.listen(process.env.PORT || 3000, () =>  {
    console.log(process.env.PORT);
    console.log(api);
    console.log('Server is running http://localhost:'+ process.env.PORT);
});
