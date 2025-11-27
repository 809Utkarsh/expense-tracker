require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');

const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const expenseController = require('./controllers/expenseController');

app.use(express.json());

app.use('/auth', authRoutes);

app.use(authMiddleware);

app.use('/api/expenses', expenseRoutes);

// api to get all the summary
app.get('/summary', expenseController.getSummary);

app.get('/', (req, res) => res.json({ message: 'express api running' }));

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate().then(() => {
  console.log('connected to postgres database');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;
