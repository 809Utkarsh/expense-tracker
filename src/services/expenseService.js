const { Expense, sequelize } = require('../models');
const { Op } = require('sequelize');

const ExpenseService = {
  async createExpense(payload) {
    try {
      const expense = await Expense.create(payload);

      return {
        status: 201,
        message: 'Expense created successfully',
        data: expense,
      };
    } catch (error) {
      console.error('Error creating expense:', error);
      return { status: 500, message: 'Internal server error' };
    }
  },

  async getAllExpenses({ page, limit, category, start_date, end_date }) {
    try {
      const where = {};

      if (category) where.category = category;

      if (start_date || end_date) {
        where.date = {};
        if (start_date) where.date[Op.gte] = start_date;
        if (end_date) where.date[Op.lte] = end_date;
      }

      const options = {
        where,
        order: [['createdAt', 'DESC']],
      };

      if (page && limit) {
        options.limit = Number(limit);
        options.offset = (Number(page) - 1) * Number(limit);
      }

      const expenses = await Expense.findAll(options);

      return {
        status: 200,
        message: 'Expenses fetched successfully',
        data: expenses,
      };
    } catch (error) {
      console.error('Error fetching expenses:', error);
      return { status: 500, message: 'Internal server error' };
    }
  },

  async getExpenseById(id) {
    try {
      const expense = await Expense.findByPk(id);

      if (!expense) {
        return { status: 404, message: 'Expense not found' };
      }

      return {
        status: 200,
        message: 'Expense fetched successfully',
        data: expense,
      };
    } catch (error) {
      console.error('Error fetching expense:', error);
      return { status: 500, message: 'Internal server error' };
    }
  },

  async updateExpense(id, payload) {
    try {
      const [rowCount, [updated]] = await Expense.update(payload, {
        where: { id },
        returning: true,
      });

      if (rowCount === 0) {
        return { status: 404, message: 'Expense not found' };
      }

      return {
        status: 200,
        message: 'Expense updated successfully',
        data: updated,
      };
    } catch (error) {
      console.error('Error updating expense:', error);
      return { status: 500, message: 'Internal server error' };
    }
  },

  async deleteExpense(id) {
    try {
      const deleted = await Expense.destroy({ where: { id } });

      if (!deleted) {
        return { status: 404, message: 'Expense not found' };
      }

      return {
        status: 204,
        message: 'Expense deleted successfully',
        data: null,
      };
    } catch (error) {
      console.error('Error deleting expense:', error);
      return { status: 500, message: 'Internal server error' };
    }
  },

  async getSummary() {
    try {
      const totalRow = await Expense.findAll({
        attributes: [
          [sequelize.fn('SUM', sequelize.col('amount')), 'total_expense'],
        ],
      });

      const total_expense = parseFloat(totalRow[0].get('total_expense') || 0);

      const categories = await Expense.findAll({
        attributes: [
          'category',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total'],
        ],
        group: ['category'],
      });

      const category_totals = {};
      categories.forEach((c) => {
        category_totals[c.get('category')] = parseFloat(c.get('total'));
      });

      return {
        status: 200,
        message: 'Summary fetched successfully',
        data: { total_expense, category_totals },
      };
    } catch (error) {
      console.error('Error fetching summary:', error);
      return { status: 500, message: 'Internal server error' };
    }
  },

  async getMonthlyStats() {
    try {
      const results = await Expense.findAll({
        attributes: [
          [sequelize.fn('to_char', sequelize.col('date'), 'YYYY-MM'), 'month'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'total'],
        ],
        group: ['month'],
        order: [['month', 'ASC']],
      });

      const monthly = {};
      results.forEach((r) => {
        monthly[r.get('month')] = parseFloat(r.get('total'));
      });

      return {
        status: 200,
        message: 'Monthly stats fetched successfully',
        data: monthly,
      };
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
      return { status: 500, message: 'Internal server error' };
    }
  },
};

module.exports = ExpenseService;
