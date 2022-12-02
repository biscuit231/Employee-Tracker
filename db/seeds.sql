INSERT INTO department (dept_name)
VALUES
('Sales'),
('Legal'),
('Finance'),
('Engineering');

INSERT INTO roles (title, department_id, salary)
VALUES
('Lawyer', 2, 190000),
('Legal Team Lead', 2, 250000),
('Accountant', 3, 125000),
('Account Manager', 3, 160000),
('Software Engineer', 4, 120000),
('Lead Engineer', 4, 150000),
('Salesperson', 1, 80000),
('Sales Lead', 1, 100000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1), 
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 1),
('Kunhal', 'Singh', 5, NULL),
('Malia', 'Brown', 6, 1),
('Sarah', 'Lourd', 7, NULL),
('Tom', 'Allen', 8, 5);