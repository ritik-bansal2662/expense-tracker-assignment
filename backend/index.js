require('dotenv').config()
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./config/db');
const expensesRoutes = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(
  cors({
    origin: "*", // Allow all origins (IPs)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow all methods
    allowedHeaders: ["*"], // Allow all headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => console.log("Database synced"));

app.use('/expenses', expensesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
