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
        choices: [renderDepartments()], //how do i do this
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
        message: "What is the new employee's role?",
        choices: [], //how do i do this
        name: "newEmployeeRole",
    },

    {
        when: input => {
            return input.initialQuestion == "Add An Employee"
        },
        type: "list",
        message: "Who is the new employee's manager?",
        choices: [], //how do i do this
        name: "newEmployeeManager",
    },

    {
        when: input => {
            return input.initialQuestion == "Update Employee Role"
        },
        type: "list",
        message: "Which employee's role would you like to update?",
        choices: [], //how do i do this
        name: "EmployeeUpdate",
    },

    {
        when: input => {
            return input.initialQuestion == "Update Employee Role"
        },
        type: "list",
        message: "Which role would you like to assign the selected employee?",
        choices: [], //how do i do this
        name: "EmployeeRoleUpdate",
    }
    
]

function renderDepartments() {
    let department = null;
    db.query('SELECT department.name AS name, department.id AS value FROM department', function (err, results) {
        // console.log(results);
        department = results;
        
        // console.log(department)
        return department
    });
}

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
                let roleValues = [insertRole, insertRoleSalary, insertRoleDepartment]
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, roleValues, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${insertRole} into database!`);
                });

            } else if (responses.initialQuestion == "Add An Employee") {
                let insertEmployeeFirstName = responses.newEmployeeFirstName;
                let insertEmployeeLastName = responses.newREmployeeLastName;
                let insertNewEmployeeRole = responses.newEmployeeRole;
                let insertNewEmployeeManager = responses.newEmployeeManager;
                let employeeValues = [insertEmployeeFirstName, insertEmployeeLastName, insertNewEmployeeRole, insertNewEmployeeManager]
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?, ?)`, employeeValues, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${insertEmployeeFirstName} ${insertEmployeeLastName} into database!`);
                });

            } else if (responses.initialQuestion == "Update Employee Role") {
                let insertEmployeeRoleUpdate = responses.insertEmployeeRoleUpdate;
                let insertEmployeeUpdate = responses.EmployeeUpdate;
                db.query(`UPDATE employee SET role_id = ______ WHERE id = ?)`, employeeValues, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Updated employee!`);
                });

            } else {
                console.log("Goodbye!")
                process.exit();
            }
        })
};

renderInformation();

// do the views first
// adds next
// update employee role