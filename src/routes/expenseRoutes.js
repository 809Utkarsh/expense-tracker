const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenseController');

// POST /expenses
router.post('/', controller.createExpense);

// List All Expenses
router.get('/', controller.getExpenses);

// GET /expenses/:id
router.get('/:id', controller.getExpense);

// PUT /expenses/:id
router.put('/:id', controller.updateExpense);

// DELETE /expenses/:id
router.delete('/:id', controller.deleteExpense);

// MONTHLY STATS
router.get('/stats/monthly', controller.getMonthlyStats);

module.exports = router;
