const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mangini2023!",
  database: "company_db",
});

function init() {
  inquirer
    .prompt({
      name: "initialQuestion",
      type: "list",
      message: "What do you want to do?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "EXIT",
      ],
    })
    .then((answers) => {
      switch (answers.initialQuestion) {
        case "view all departments":
          viewAllDepartments();
          break;
        case "view all roles":
          viewAllRoles();
          break;
        case "view all employees":
          viewAllEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployeeRole();
          break;
        case "EXIT":
          db.end();
          break;
        default:
          break;
      }
    });
}

function viewAllDepartments() {
    db.query("select * from departments;", function (err, res) { 
        console.log("Viewing Departments");
        console.log(res);
        init();
    })
}

function viewAllRoles() {
    db.query("select * from roles;", function (err, res) { 
        console.log("Viewing roles");
        console.log(res);
        init();
    })
}

function viewAllEmployees() {
    db.query("select * from employees;", function (err, res) { 
        console.log("Viewing employees");
        console.log(res);
        init();
    })
}

function addDepartment() {
    inquirer.prompt({
            name: "deptquestion",
            type: "input",
            message: "Which department would you like to add?"
    })
    .then((answers) => {
        console.log(answers.deptquestion);
        db.query("INSERT INTO departments SET ?",
        {name: answers.deptquestion},
        function(err){
            if(err) throw err;
            init(); 
        })
    })
}

function addRole() {
}

function addEmployee() {
}

function updateEmployeeRole() {
}

init();


