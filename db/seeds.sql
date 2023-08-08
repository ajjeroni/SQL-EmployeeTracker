USE company_db;

INSERT INTO departments (name_) VALUES
("Tech"),
("Finance"),
("Medicine");

INSERT INTO roles (title, salary, department_id) VALUES 
("Web Developer", 100000, 1),
("Accountant", 80000, 2),
("Nurse", 200000, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES
("Robert", "Patterson", 1, 1),
("Emma", "Stone", 2, 1),
("Dua", "Lipa", 3, 1);