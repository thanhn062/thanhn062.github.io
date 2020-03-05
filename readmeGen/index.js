const axios = require("axios");
const inquirer = require("inquirer");
const fs = require('fs');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
inquirer.prompt([
  {
    type: "list",
    message: "What do you want to do ?",
    name: "choice",
    choices: [
      "Create a README file",
      "Generate github profile"
    ]
  }
]).then( function(data) {
  console.log(data);
  if (data.choice === "Create a README file")
    generateReadme();
  else
    getGit();
});

const questions = [
  {
    message: "enter your GitHub username:",
    name: "username"
  },
  {
    message: "Enter your project's title:",
    name: "title"
  },
  {
    message: "Enter your project's description:",
    name: "description"
  },
  {
    message: "Enter table of content",
    name: "toc"
  },
  {
    message: "Enter installation note:",
    name: "installation"
  },
  {
    message: "Enter usage note:",
    name: "usage"
  },
  {
    type: "list",
    message: "Pick a license for your project",
    name: "license",
    choices: [
      "Apache 2.0 License",
      "BSD 3-Clause License",
      "Creative Common",
      "GNU GPL v3",
      "The MIT License",
    ]
  },
  {
    message: "Enter contributing note: ",
    name: "contribute"
  },
  {
    message: "Enter test note:",
    name: "test"
  },
  {
    message: "Enter questions:",
    name: "question"
  }
];

async function getGit() {
  try {

  } catch (err) {
    console.log(err);
  }

}

async function generateReadme() {
  try {
    console.log("Let's make a README file !\n");
    const answers = await inquirer.prompt(questions);

    // Get github's info by API
    const { data } = await axios.get(`https://api.github.com/users/${answers.username}/events/public`);
    const avatar_url = data[1].actor.avatar_url;
    const email = data[1].payload.commits[0].author.email;
    const name = data[1].payload.commits[0].author.name;

    switch (answers.license) {
      case "Apache 2.0 License":
        answers.license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        break;
      case "BSD 3-Clause License":
        answers.license = "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
        break;
      case "Creative Common":
        answers.license = "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)";
        break;
      case "GNU GPL v3":
        answers.license = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        break;
      case "The MIT License":
        answers.license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    };

    const readme =
`# ${answers.title}

## Description
${answers.description}

## Table of Contents
${answers.toc}

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license}

## Contributing
${answers.contribute}

## Tests
${answers.test}

## Questions
${answers.question}`;

    await writeFileAsync(
      "README.md",readme
    );
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
