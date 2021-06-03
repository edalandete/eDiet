const express = require('express');

const app = express();
const debug = require('debug')('app');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes')();
const dieticiansRouter = require('./routes/dieticians.routes');
const dietsRouter = require('./routes/diets.routes');
const appointmentsRouter = require('./routes/appointments.routes');
const patientsRouter = require('./routes/patients.routes');

require('./ddbb/mongoose.config');
require('./passport/passport.config')(app);

const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);
app.use('/api/dieticians', dieticiansRouter);
app.use('/api/diets', dietsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/patients', patientsRouter);

app.listen(port, debug(`server is running on port ${port}`));
