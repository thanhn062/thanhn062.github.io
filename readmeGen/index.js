const axios = require("axios");
const inquirer = require("inquirer");
const fs = require('fs');

inquirer.prompt([
  {
    type: "list",
    message: "What do you want to do ?",
    name: "choice",
    choices: [
      "Create a README file",
      "Get github profile"
    ]
  }
]).then( function(data) {
  console.log(data);
  if (data.choice === "Create a README file")
    generateReadme();
  else
    getGit();
});

async function getGit() {
  try {

  } catch (err) {
    console.log(err);
  }

}

async function generateReadme() {
  try {
    console.log("Let's make a README file !\nIn order to do that, please");
    // Get github username
    const { username } = await inquirer.prompt({
      message: "enter your GitHub username:",
      name: "username"
    });

    // Get github's info by API
    const { data } = await axios.get(`https://api.github.com/users/${username}/events/public`);
    const avatar_url = data[1].actor.avatar_url;
    const email = data[1].payload.commits[0].author.email;
    const name = data[1].payload.commits[0].author.name;
    // Get user input for title
    const { title } = await inquirer.prompt({
      message: "Enter your project's title:",
      name: "title"
    });

    // Set readme title
    var readme = `# ${title}\n`;
    // Get user input for description
    const { description } = await inquirer.prompt({
      message: "Enter your project's description:",
      name: "description"
    });
    // Append description to readme
    readme += `## Description\n${description}\n`;
    // Get user input for TOC
    const { toc } = await inquirer.prompt({
      message: "Enter table of content",
      name: "toc"
    });
    // Append toc to readme
    readme += `## Table of Contents\n${toc}\n`;
    // Get installation note
    const { installation } = await inquirer.prompt({
      message: "Enter installation note:",
      name: "installation"
    });
    // Append installation note
    readme += `## Installation\n${installation}\n`;
    // Get usage note
    const { usage } = await inquirer.prompt({
      message: "Enter usage note:",
      name: "usage"
    });
    // Append usage note
    readme += `## Usage\n${usage}\n`;
    // Licenses
    readme += `## License\n`;
    const { license } = await inquirer.prompt({
      type: "list",
      message: "Pick a license for your project",
      name: "license",
      choices: [
        "Apache 2.0 License",
        "BSD 3-Clause License",
        "Creative Common",
        "Eclipse Public License 1.0",
        "GNU GPL v3",
        "The MIT License",
      ]
    });
      if (license === "Apache 2.0 License")



  } catch (err) {
    console.log(err);
  }
}

/*const axios = require("axios");
const inquirer = require("inquirer");
const fs = require('fs');

console.log("Let's make a README file !\nIn order to do that, please");
getGit();

async function getGit() {
  try {
    const { username } = await inquirer.prompt({
      message: "Enter your username: ",
      name: "username"
    });
    const { data } = await axios.get(`https://api.github.com/users/${username}/events/public`);

    console.log(data[1].actor.avatar_url); // Avatar URL
    //console.log(data[1].payload.commits);
    var git_info = JSON.parse(data[1].payload.commits);
    console.log(git_info);
  } catch (err) {
    //console.log(err);
  }
}

inquirer.prompt([
  {
    type: "input",
    name: "username",
    message: "Enter your GitHub username:"
  },

  {
    type: "input",
    name: "Okay, let's start.\nEnter project title: ",
    message: "title"
  },
  {
    type: "input",
    name: "Now, let's make a table of contents for your readme \n Enter a label for your badge: ",
    message: "badge_label"
  }
]);

// Create table of content
let loop_toc = true;
while (loop_toc) {
  inquirer.prompt([

    {
      type: "list",
      message: "Do you want to m"
    }
  ]).then( answers => {

  });
}

const questions = [

];

function writeToFile(fileName, data) {
}

function init() {

}

init();
*/
