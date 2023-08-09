const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mangini2023!",
  database: "company_db",
});

async function queryRoles() {
  return new Promise((resolve, reject) => {
    db.query("select * from roles", function (err, results) {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function queryEmployees() {
  return new Promise((resolve, reject) => {
    db.query("select * from employees", function (err, results) {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function queryDepartments() {
  return new Promise((resolve, reject) => {
    db.query("select * from departments", function (err, results) {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

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
    console.table(res);
    init();
  });
}

function viewAllRoles() {
  db.query("select * from roles;", function (err, res) {
    console.log("Viewing roles");
    console.table(res);
    init();
  });
}

function viewAllEmployees() {
  db.query("select * from employees;", function (err, res) {
    console.log("Viewing employees");
    console.table(res);
    init();
  });
}

  function addDepartment() {
  inquirer
    .prompt({
      name: "deptquestion",
      type: "input",
      message: "Which department would you like to add?",
    })
    .then((answers) => {
      console.log(answers.deptquestion);
      db.query(
        "INSERT INTO departments SET ?",
        { name_: answers.deptquestion },
        function (err) {
          if (err) throw err;
          init();
        }
      );
    });
}

async function addRole() {
  const departments = await queryDepartments();
  inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "Which title would you like to add?",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "what is the salary?"
      },
      {
        name: "roleDepartment",
        type: "list",
        message: "What is the department?",
        choices: departments.map((department) => ({ name: department.name_, value: department.id }))
      }
    ])
    .then((answers) => {
      console.log(answers.roleTitle);
      console.log(answers.roleDepartment);
      db.query(
        "INSERT INTO roles SET ?",
        {
          title: answers.roleTitle,
          salary: answers.roleSalary,
          department_id: answers.roleDepartment
        },
        function (err) {
          if (err) throw err;
          init();
        }
      );
    });
}

async function addEmployee() {
  const roles = await queryRoles();
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is your first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is your last name?",
      },
      {
        name: "roleId",
        type: "list",
        message: "What is the role?",
        choices: roles.map((role) => ({ name: role.title, value: role.id })),
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the manager id?",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleId,
          manager_id: answers.managerId,
        },
        function (err) {
          if (err) throw err;
          init();
        }
      );
    });
}

async function updateEmployeeRole() {
  const employee = await queryEmployees();
  const role = await queryRoles();
  inquirer.prompt([
    {
      name: "updateEmployee",
      type: "list",
      message: "Which employee would you like to update?",
      choices: employee.map((employee) => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.role_id }))
    },
    {
      name: "updateRole",
      type: "list",
      message: "Which role would this employee have?",
      choices: role.map((roles) => ({name: roles.title, value: roles.department_id}))
    }
  ])
  .then((answers) => {
    db.query("")
  }
    )
}

init();
