const express = require('express');
const morgan = require('morgan');
var bodyParser = require("body-parser");
const { engine } = require('express-handlebars');
const db = require('./config/db');
const path = require('path');
const route = require('./routes');

db.connect();

const app = express();
const port = 1234;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.engine('.hbs', engine({ 
  extname: '.hbs',
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

route(app);