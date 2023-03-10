const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const authMiddleware = require('./middlewares/auth');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const routes = require('./routes');

// Connect to MongoDB
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error));

// Create Express app
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Set up JWT authentication middleware
app.use(authMiddleware);

// Set up API routes
app.use('/api', routes);

// Set up error handler middleware
app.use(errorHandlerMiddleware);

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
