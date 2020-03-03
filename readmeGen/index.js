const axios = require("axios");
const inquirer = require("inquirer");
const fs = require('fs');

console.log("Let's make a README file !\nIn order to do that, please");

getGit();

async function getGit() {
  try {
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
    const { title } = await inquirer.prompt({
      message: "Enter your project's title:",
      name: "title"
    });
    const { description } = await inquirer.prompt({
      message: "Enter your project's description:",
      name: "description"
    });

    let loop_toc = true;
    let toc_count = 1;
    while (loop_toc) {
      const { heading } = await inquirer.prompt({
        message: `Enter table of content #${toc_count}`,
        name: "heading"
      });
      toc_count++;
      console.log("Do you need more heading ?");
      const { more } = await inquirer.prompt({
        type: "list",
        name: "more",
        choices: [
          "Yes",
          "No"
        ]
      });
      console.log(more);
      console.log(heading);
    };
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
