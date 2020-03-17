const inquirer = require("inquirer");
const fs = require('fs');
const util = require("util");

// Employee
class Employee  {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getName() {return this.name}
  getId() {return this.id}
  getEmail() {return this.email}
  getRole() {return "Employee"}
};

// Manager
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getRole() {return "Manager"}
}
// Engineer
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  getGithub() {return this.github}
  getRole() {return "Manager"}
}
// Intern
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  getSchool() {return this.school}
  getRole() {return "Manager"}
}

getUserInput();

async function getUserInput() {
  try {
    console.log("Let's put together an engineer team.");
    var manager = await inquirer.prompt([
      {
        type: "input",
        message: "An engineer team MUST have a manager, enter the manager's name:",
        name: "name",
      },
      {
        type: "input",
        message: "Enter manager's ID:",
        name: "id",
      },
      {
        type: "input",
        message: "Enter manager's email:",
        name: "email",
      },
      {
        type: "input",
        message: "Enter manager's officer number:",
        name: "officeNumber",
      }
    ]);
    // Create manager instance
    var manager = new Manager(manager.name, manager.id, manager.email, manager.officeNumber);

    // Create empty array for engineers & interns
    var engineers = [];
    var interns = [];

    // Loop to add engineers & interns
    for(var i = 1;i > 0; i++) {
      const add = await inquirer.prompt({
          type: "list",
          message: "Do you want to add more Engineer or Intern into the team ?",
          name: "choice",
          choices: [
            "Engineer",
            "Intern",
            "No"
          ]
        });

        if (add.choice === "Engineer") {
          var engineer = await inquirer.prompt([
            {
              type: "input",
              message: "Enter the engineer's name:",
              name: "name",
            },
            {
              type: "input",
              message: "Enter engineer's ID:",
              name: "id",
            },
            {
              type: "input",
              message: "Enter engineer's email:",
              name: "email",
            },
            {
              type: "input",
              message: "Enter engineer github:",
              name: "github",
            }
          ]);
          // Add new engineer to the array
          engineers.push(engineer);
        }
        else if (add.choice === "Intern") {
          var intern = await inquirer.prompt([
            {
              type: "input",
              message: "Enter the intern's name:",
              name: "name",
            },
            {
              type: "input",
              message: "Enter intern's ID:",
              name: "id",
            },
            {
              type: "input",
              message: "Enter intern's email:",
              name: "email",
            },
            {
              type: "input",
              message: "Enter intern's school:",
              name: "github",
            }
          ]);
          // Add new intern to the array
          engineers.push(intern);
        }
        else
          break;
      }
  } catch (err) {
    console.log(err);
  }
}

module.exports = getUserInput;
module.exports = Manager;
module.exports = Intern;
module.exports = Engineer;
module.exports = Employee;

// Hire new employee
//var emp_1 = new Employee("Thanh", 0, "510thanh.ngo@gmail.com");
//var emp_2 = new Manager("Thu", 1, "anhtng042020@yahoo.com", 999);

//console.log(emp_1.getRole());
//console.log(emp_2.getRole());
//console.log(emp_2.officeNumber);
