INSERT INTO department (name)
VALUES ("Partners"),
       ("Accounting"),
       ("Valuation"),
       ("Marketing"),
       ("Software Development");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Managing Partner", 750000.00, 1),
       ("Accountant", 93000.00, 2),
       ("Consultant", 75000.00, 3),
       ("Chief Marketing Officer", 189000.00, 4),
       ("Senior Developer", 115000.00, 5);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("Carl", "Price", null, 1),
       ("John", "Smith", 1, 2),
       ("Mark", "Randall", 1, 3),
       ("Brittany", "Green", 1, 4),
       ("Kelsey", "Brent", 1, 5);