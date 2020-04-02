const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
seperate();

async function seperate() {
  try {
    console.log("trying...");
    var cities = await readFileAsync("./city.list.json","utf-8");
    var obj = JSON.parse(cities);
    var newObj = "";
    obj.forEach((item, i) => {
      if(item.country == "US") {
        var itemTemp = JSON.stringify(item) + ",";
        newObj+=itemTemp;
      }
    });
    await writeFileAsync("us-city-code.json", "["+newObj+"]", "utf8");
  } catch (err) {
    console.log(err);
  }
}
