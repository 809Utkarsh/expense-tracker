const ExpenseService = require('../services/expenseService');
const { validateExpense } = require('../utils/validation');

exports.createExpense = async (req, res) => {
  const { error, value } = validateExpense(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const result = await ExpenseService.createExpense(value);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

exports.getExpenses = async (req, res) => {
  const params = req.query;
  const result = await ExpenseService.getAllExpenses(params);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

exports.getExpense = async (req, res) => {
  const result = await ExpenseService.getExpenseById(req.params.id);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

exports.updateExpense = async (req, res) => {
  const { error, value } = validateExpense(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const result = await ExpenseService.updateExpense(req.params.id, value);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

exports.deleteExpense = async (req, res) => {
  const result = await ExpenseService.deleteExpense(req.params.id);

  if (result.status === 204) {
    return res.status(204).send();
  }

  return res.status(result.status).json({ message: result.message });
};

exports.getSummary = async (req, res) => {
  const result = await ExpenseService.getSummary();
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

exports.getMonthlyStats = async (req, res) => {
  const result = await ExpenseService.getMonthlyStats();
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
