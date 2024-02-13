const inquirer = require("inquirer");
const mysql = require('mysql2');

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

// Array of questions to get user input
const questions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "initialQuestion",
        choices: ["View All Employees", "Add An Employee", "Update Employee Role", "View All Roles", "Add A Role", "View All Departments", "Add A Department", "Quit"]
    },
]

db.query("Select * from department", (err, results) => {
if (err) {
    throw err;
} else {
    console.table(results);
}
});

// do the views first
// adds next
// update employee role
// quit ends mysql goodbye message then process.exit()