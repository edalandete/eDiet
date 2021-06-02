const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes')();
const dieticiansRouter = require('./routes/dieticians.routes');
const dietsRouter = require('./routes/diets.routes');
const appointmentsRouter = require('./routes/appointments.routes');

require('./ddbb/mongoose.config');

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./passport/passport.config')(app);

app.use('/', authRoutes);
app.use('/api/dieticians', dieticiansRouter);
app.use('/api/diets', dietsRouter);
app.use('/api/appointments', appointmentsRouter);

app.listen(port, debug(`server is running on port ${port}`));
