DROP DATABASE IF EXISTS `employee_DB`;
CREATE database `employee_DB`;

USE `employee_DB`;
-- Create tables
CREATE TABLE department (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
)

CREATE TABLE role (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (id)
)

CREATE TABLE employee (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `role_id` INT NOT NULL,
  `manager_id` INT,
  PRIMARY KEY (id)
);

-- Assign department id
INSERT INTO `department` (name) VALUES ("Sales"); -- 1
INSERT INTO `department` (name) VALUES ("Engineering"); -- 2
INSERT INTO `department` (name) VALUES ("Finance"); -- 3
INSERT INTO `department` (name) VALUES ("Legal"); -- 4

-- Assign role id & department it belong to
INSERT INTO `role` (title, salary, department_id)
VALUES ("Sales Lead",100000,1);
INSERT INTO `role` (title, salary, department_id)
VALUES ("Sales person",80000,1);
INSERT INTO `role` (title, salary, department_id)
VALUES ("Lead Engineer",150000,2);
INSERT INTO `role` (title, salary, department_id)
VALUES ("Software Engineer",120000,2);
INSERT INTO `role` (title, salary, department_id)
VALUES ("Accountant",125000,3);
INSERT INTO `role` (title, salary, department_id)
VALUES ("Legal Team Lead",250000,4);
INSERT INTO `role` (title, salary, department_id)
VALUES ("Lawyer",190000,4);
