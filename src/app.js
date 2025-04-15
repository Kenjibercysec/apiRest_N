require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('./config/database');
const logger = require('./config/logger');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Iniciando o servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
    
    app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    logger.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer(); 