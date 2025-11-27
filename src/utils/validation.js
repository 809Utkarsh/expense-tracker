const Joi = require('joi');

const expenseSchema = Joi.object({
  title: Joi.string().min(1).required(),
  category: Joi.string().min(1).required(),
  amount: Joi.number().greater(0).required(),
  date: Joi.date().iso().required(),
});

module.exports = {
  validateExpense: (payload) => expenseSchema.validate(payload),
};
