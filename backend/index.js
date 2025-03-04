require('dotenv').config()
const express = require('express');
const {sequelize} = require('./config/db');
const expensesRoutes = require('./routes/expenses');

const app = express();
app.use(express.json());

sequelize.sync().then(() => console.log("Database synced"));

app.use('/expenses', expensesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
