// TODO -> GENERATE HTML
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const  engineers = [];
const  interns = [];
console.log("Let's put together an engineer team.");
inquirer.prompt([
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
]).then(function(ans) {
  // Create manager
  var manager = new Manager(ans.id, ans.name, ans.email, ans.officeNumber);
  addMember();
});

function addMember() {
  inquirer.prompt({
    type: "list",
    message: "Do you want to add more Engineer or Intern into the team ?",
    name: "choice",
    choices: ["Engineer","Intern","No"]
  }).then(function(ans) {
      if (ans.choice === "Engineer") {
        addEngineer();
      }
      else if (ans.choice === "Intern") {
        addIntern();
      }
      else if (ans.choice === "No") {
        return;
      }
  });
}
function addEngineer() {
  inquirer.prompt([
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
  ]).then(function(ans) {
    // Add new engineer to the array
    var engineer = {
      id: ans.id,
      name: ans.name,
      email: ans.email,
      github: ans.github
    }
    engineers.push(engineer);
    addMember();
  });
}

function addIntern() {
  inquirer.prompt([
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
    name: "school",
  }
  ]).then(function(ans) {
  // Add new intern to the array
  var intern = {
    id: ans.id,
    name: ans.name,
    email: ans.email,
    school: ans.school
  }
  engineers.push(intern);
  addMember();
  });
}
