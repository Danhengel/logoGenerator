
const inquirer = require("inquirer");
const fs = require("fs")
const {Circle, Square, Triangle} = require("./lib/shapes");


function writeToFile(fileName, data) {
    let svgString = "";
    svgString =
      '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgString += "<g>";
    svgString += `${data.shape}`;
  
    let shapeChoice;
    if (data.shape === "Triangle") {
      shapeChoice = new Triangle();
      svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${data.shapeBackgroundColor}"/>`;
    } else if (data.shape === "Square") {
      shapeChoice = new Square();
      svgString += `<rect x="73" y="40" width="160" height="160" fill="${data.shapeBackgroundColor}"/>`;
    } else {
      shapeChoice = new Circle();
      svgString += `<circle cx="150" cy="115" r="80" fill="${data.shapeBackgroundColor}"/>`;
    }
  
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${data.textColor}">${data.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";
  
    fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
    });
  }


function promptUser() {
    inquirer
    .prompt([
    {
        type: "input",
        name: "text",
        message: "Enter three characters for utilization in Logo:",
    },
    {
        type: "input",
        name: "textColor",
        message: "Enter a color keyword (OR a hexadecimal number) for text:",
    },
    {
        type: "list",
        name: "shape",
        message: "Choose which shape fromt he following, would you like?",
        choices: ["Circle", "Triangle", "Square"],
    },
    {
        type: "input",
        name: "shapeBackgroundColor",
        message: "Enter a color keyword (OR a hexadecimal number) for shape:",
    },
])

    .then((data) => {
          if (data.text.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        promptUser();
        } else {
        writeToFile("logo.svg", data);
        }
    });
}

promptUser();