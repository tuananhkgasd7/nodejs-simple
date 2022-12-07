const express = require('express');
const morgan = require('morgan');
var bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);
const db = require('./config/db');
const route = require('./routes');

db.connect();

const app = express();
const port = 1234;

app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

route(app);