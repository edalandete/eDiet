const express = require('express');

const debug = require('debug')('app');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const authRoutes = require('./routes/auth.routes');
const dieticiansRouter = require('./routes/dieticians.routes');
const dietsRouter = require('./routes/diets.routes');
const appointmentsRouter = require('./routes/appointments.routes');
const patientsRouter = require('./routes/patients.routes');

require('./ddbb/mongoose.config');

require('./passport/strategies/local.strategy');
require('./passport/strategies/jwt.strategy');

const port = process.env.PORT || 4000;
const originHost = process.env.ORIGIN_HOST || 'http://localhost:4200';

const app = express();
app.disable('x-powered-by');
const corsOptions = {
  origin: originHost,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(passport.initialize());

app.use('/', authRoutes);
app.use('/api/dieticians', passport.authenticate('jwt', { session: false }), dieticiansRouter);
app.use('/api/diets', passport.authenticate('jwt', { session: false }), dietsRouter);
app.use('/api/appointments', passport.authenticate('jwt', { session: false }), appointmentsRouter);
app.use('/api/patients', passport.authenticate('jwt', { session: false }), patientsRouter);

app.listen(port, debug(`server is running on port ${port}`));
