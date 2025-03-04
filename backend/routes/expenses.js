const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();
const { Op } = require('sequelize');

// Add a new expense
router.post('/', async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const expense = await Expense.create({ description, amount, category, date });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  Get all expenses (or filter by category and date)
router.get('/', async (req, res) => {
  try {
    const { category, date } = req.query;
    const where = {};
    if (category) where.category = category;
    if (date) where.date = date;

    const expenses = await Expense.findAll({ where });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get total expenses for a date range
router.get('/total', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ error: "Start and end date required" });

    const total = await Expense.sum('amount', {
      where: { date: { [Op.between]: [start, end] } }
    });

    res.json({ total: total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
