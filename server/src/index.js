const express = require('express');
const passport = require('passport');
const debug = require('debug')('app');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;
app.use(morgan('dev'));
app.use(express.json());
app.listen(port, debug(`server is running on port ${port}`));
