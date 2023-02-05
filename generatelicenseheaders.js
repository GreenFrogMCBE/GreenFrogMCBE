const fs = require("fs");
const path = require("path");

const LICENSE_HEADER = `/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░ 
 * 
 * 
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
*/
`;

const srcPath = path.join(__dirname, ".");

const addHeader = (filePath) => {
  if (filePath.includes("node_modules")) return;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }
    let contents = data.toString();
    if (!contents.includes("Copyright 2023 andriycraft")) {
      contents = LICENSE_HEADER + contents;
      fs.writeFile(filePath, contents, (err) => {
        if (err) {
          console.error(
            `Error adding license header to file ${filePath}:`,
            err
          );
          return;
        }
        console.log(`Added license header to file ${filePath}`);
      });
    }
  });
};

const walk = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for file ${filePath}:`, err);
          return;
        }
        if (stats.isDirectory()) {
          walk(filePath);
        } else if (path.extname(filePath) === ".js") {
          addHeader(filePath);
        }
      });
    });
  });
};

walk(srcPath);
