const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const checkForSession = require('../server/middlewares/checkForSession');
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const searchController = require('./controllers/search_controller');
const cartController = require('./controllers/cart_controller');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(express.static( `${__dirname}/build` ));

app.use(checkForSession);

app.get('/api/swag', swagController.read);
app.get('/api/user', authController.getUser);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.post('/api/cart', cartController.add );
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.delete);
app.get('/api/search', searchController.search);

const port = process.env.SERVER_PORT || 3005;
app.listen(port, () => console.log(`surfin on port ${port}`))