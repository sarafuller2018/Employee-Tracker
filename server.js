const express = require('express');
const mysql = require('mysql2');

// Create port to run application on
const PORT = process.env.PORT || 3001;
// Express functionality in a variable
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect mysql to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'dogziggy',
    database: 'employees_db'
  },
  console.log(`Successfully connected to employees_db!`)
);