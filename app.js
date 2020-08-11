//import data
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routers/titleRouters.js');


//set up express
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//requests router
app.use('/api/titles', router.router());

// errors handling
app.use(notFound);

app.listen(3000, () => console.log('Express is running on port: 3000'));


//executing queny function

function notFound(req, res, next) {
    const err = new Error('404 page not found');
    err.status = 404;
    next(err);
}