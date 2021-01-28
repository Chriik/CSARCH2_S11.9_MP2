// REQUIRES
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');

const app = express();

// DEV REQUIRES
let morgan
// if (process.env.NODE_ENV === 'development') {
morgan = require('morgan');
// }

// GLOBAL VARIABLES
const HOST = 'localhost';
//const PORT = 8080;
process.env.PORT || 8080;

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set the folder `public` as folder containing static assets
// such as stylesheets, javascripts, and image files
app.use(express.static(path.join(__dirname, '/public')));

// middlewares
// if (process.env.NODE_ENV === 'development')
app.use(morgan('dev'));

app.use(express.json());
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: true,
}));

//set routes
const cacheMemoryBSAMRURouter = require('./routes/cacheMemorySimRouter.js');

app.use('/', cacheMemoryBSAMRURouter);

app.listen(PORT, () => {
    console.log(`Listening to http://${HOST}:${PORT}`);
});