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
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update Employee Role", "Quit"]
    },

    {
        when: input => {
            return input.initialQuestion == "Add A Department"
        },
        type: "input",
        message: "What is the name of the new department?",
        name: "newDepartment",
    },

    {
        when: input => {
            return input.initialQuestion == "Add A Role"
        },
        type: "input",
        message: "What is the name of the new role?",
        name: "newRoleName",
    },

    {
        when: input => {
            return input.initialQuestion == "Add A Role"
        },
        type: "input",
        message: "What is the salary for the new role?",
        name: "newRoleSalary",
    },

    {
        when: input => {
            return input.initialQuestion == "Add A Role"
        },
        type: "list",
        message: "Which department is the new role under?",
        choices: ["Partners", "Accounting", "Valuation", "Marketing", "Software Development"], //how do i do this
        name: "newRoleDepartment",
    }
]

function renderInformation() {
    inquirer
        .prompt(questions)
        .then((responses) => {
            if (responses.initialQuestion == "View All Departments") {
                db.query("Select * from department", (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table(results);
                    }
                });

            } else if (responses.initialQuestion == "View All Roles") {
                db.query("Select * from role", (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table(results);
                    }
                });

            } else if (responses.initialQuestion == "View All Employees") {
                db.query("Select * from employee", (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table(results);
                    }
                });

            } else if (responses.initialQuestion == "Add A Department") {
                let insertDepartment = responses.newDepartment;
                db.query(`INSERT INTO department (name) VALUES (?)`, insertDepartment, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${insertDepartment} into database!`);
                });

            } else if (responses.initialQuestion == "Add A Role") {
                let insertRole = responses.newRoleName;
                let insertRoleSalary = responses.newRoleSalary;
                let insertRoleDepartment = responses.newRoleDepartment;
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?)`, insertRole, insertRoleSalary, insertRoleDepartment, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${insertRole} into database!`);
                });

            } else if (responses.initialQuestion == "Add An Employee") {
                console.log("hello!")

            } else if (responses.initialQuestion == "Update Employee Role") {
                console.log("hello!")

            } else {
                console.log("hello!")

            }
        })
};

renderInformation();

// do the views first
// adds next
// update employee role
// quit ends mysql goodbye message then process.exit()