INSERT INTO department (name)
VALUES ("Accounting"),
       ("Valuation"),
       ("Marketing"),
       ("Software Development");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 93000.00, 1),
       ("Consultant", 75000.00, 2),
       ("Chief Marketing Officer", 189000.00, 3),
       ("Senior Developer", 115000.00, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("John", "Smith", null, 1),
       ("Mark", "Randall", 1, 2),
       ("Brittany", "Green", 1, 3),
       ("Kelsey", "Brent", 3, 4);