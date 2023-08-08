DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db; 

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_ VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments (id)
    ON DELETE RESTRICT
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
    ON DELETE SET NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employees (id)
    ON DELETE RESTRICT
);