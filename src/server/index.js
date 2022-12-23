const express = require('express');
const morgan = require('morgan');
const path = require('path');
var bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);
const {mongoConnection} = require('./service/database');
const route = require('./routes');
const {typeDatabase} = require('./config/base');

if(typeDatabase === 'mongo')
  mongoConnection();

const app = express();
const port = 1234;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

route(app);