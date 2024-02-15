const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();

// Connect mysql to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
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
        choices: async function() {
            try {
                const departments = await renderDepartments(); // Wait for departments to be fetched
                return departments.map(department => ({name: department.name, value: department.value}));
            } catch (error) {
                console.error("Error fetching departments:", error);
                return []; // Return empty array in case of error
            }
        },
        name: "newRoleDepartment",
    },

    {
        when: input => {
            return input.initialQuestion == "Add An Employee"
        },
        type: "input",
        message: "What is the new employee's first name?",
        name: "newEmployeeFirstName",
    },

    {
        when: input => {
            return input.initialQuestion == "Add An Employee"
        },
        type: "input",
        message: "What is the new employee's last name?",
        name: "newEmployeeLastName",
    },

    {
        when: input => {
            return input.initialQuestion == "Add An Employee"
        },
        type: "list",
        message: "Who is the new employee's manager?",
        choices: async function() {
            try {
                const managers = await renderEmployees(); // Wait for manager to be fetched
                return managers.map(manager => ({name: manager.FirstName + " " + manager.LastName, value: manager.value}));
            } catch (error) {
                console.error("Error fetching roles:", error);
                return []; // Return empty array in case of error
            }
        },
        name: "newEmployeeManager",
    },

    {
        when: input => {
            return input.initialQuestion == "Add An Employee"
        },
        type: "list",
        message: "What is the new employee's role?",
        choices: async function() {
            try {
                const roles = await renderRoles(); // Wait for roles to be fetched
                return roles.map(role => ({name: role.name, value: role.value}));
            } catch (error) {
                console.error("Error fetching roles:", error);
                return []; // Return empty array in case of error
            }
        },
        name: "newEmployeeRole",
    },

    {
        when: input => {
            return input.initialQuestion == "Update Employee Role"
        },
        type: "list",
        message: "Which employee's role would you like to update?",
        choices: async function() {
            try {
                const employees = await renderEmployees(); // Wait for employees to be fetched
                return employees.map(employee => ({name: employee.FirstName + " " + employee.LastName, value: employee.value}));
            } catch (error) {
                console.error("Error fetching roles:", error);
                return []; // Return empty array in case of error
            }
        },
        name: "EmployeeToUpdate",
    },

    {
        when: input => {
            return input.initialQuestion == "Update Employee Role"
        },
        type: "list",
        message: "Which role would you like to assign the selected employee?",
        choices: async function() {
            try {
                const roles = await renderRoles(); // Wait for roles to be fetched
                return roles.map(role => ({name: role.name, value: role.value}));
            } catch (error) {
                console.error("Error fetching roles:", error);
                return []; // Return empty array in case of error
            }
        },
        name: "EmployeeRoleToUpdate",
    }
    
]

// Functions to get choices in prompt
function renderDepartments() {
    console.log("renderdepartments");

   return new Promise((resolve, reject) => {
        db.query('SELECT department.name AS name, department.id AS value FROM department', function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function renderRoles() {
    console.log("renderroles");

   return new Promise((resolve, reject) => {
        db.query('SELECT role.title AS name, role.id AS value FROM role', function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function renderEmployees() {
    console.log("renderemployees");

   return new Promise((resolve, reject) => {
        db.query('SELECT employee.first_name AS FirstName, employee.last_name AS LastName, employee.id AS value FROM employee', function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Runs application
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
                        renderInformation();
                    }
                });

            } else if (responses.initialQuestion == "View All Roles") {
                db.query("Select * from role", (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table(results);
                        renderInformation();
                    }
                });

            } else if (responses.initialQuestion == "View All Employees") {
                db.query("Select * from employee", (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table(results);
                        renderInformation();
                    }
                });

            } else if (responses.initialQuestion == "Add A Department") {
                let insertDepartment = responses.newDepartment;
                db.query(`INSERT INTO department (name) VALUES (?)`, insertDepartment, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${insertDepartment} into database!`);
                    renderInformation();
                });

            } else if (responses.initialQuestion == "Add A Role") {
                let insertRole = responses.newRoleName;
                let insertRoleSalary = responses.newRoleSalary;
                let insertRoleDepartment = responses.newRoleDepartment;
                let roleValues = [insertRole, insertRoleSalary, insertRoleDepartment]
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, roleValues, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${insertRole} into database!`);
                    renderInformation();
                });

            } else if (responses.initialQuestion == "Add An Employee") {
                let insertEmployeeFirstName = responses.newEmployeeFirstName;
                let insertEmployeeLastName = responses.newEmployeeLastName;
                let insertNewEmployeeManager = responses.newEmployeeManager;
                let insertNewEmployeeRole = responses.newEmployeeRole;
                let employeeValues = [insertEmployeeFirstName, insertEmployeeLastName, insertNewEmployeeManager, insertNewEmployeeRole]
                db.query(`INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)`, employeeValues, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${insertEmployeeFirstName} ${insertEmployeeLastName} into database!`);
                    renderInformation();
                });

            } else if (responses.initialQuestion == "Update Employee Role") {
                let insertEmployeeToUpdate = responses.EmployeeToUpdate;
                let insertEmployeeRoleToUpdate = responses.EmployeeRoleToUpdate;
                db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [insertEmployeeRoleToUpdate, insertEmployeeToUpdate], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Updated employee!`);
                    renderInformation();
                });

            } else {
                console.log("Goodbye!")
                process.exit();
            }
        })
};

renderInformation();


// is it actually adding to database
// how to format tables