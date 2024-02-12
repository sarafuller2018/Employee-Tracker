const inquirer = require("inquirer");

// Array of questions to get user input
const questions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "initialQuestion",
        choices: ["View All Employees", "Add An Employee", "Update Employee Role", "View All Roles", "Add A Role", "View All Departments", "Add A Department", "Quit"]
    },
]