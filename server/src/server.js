const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const donorRoutes = require('./routes/donorRoutes');
const acceptorRoutes = require('./routes/acceptorRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
const statsRoutes = require('./routes/statsRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();

const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL] : ['*'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/donors', donorRoutes);
app.use('/api/acceptors', acceptorRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/stats', statsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
