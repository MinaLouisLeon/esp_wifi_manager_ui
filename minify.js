var fs = require("fs");
const { exec } = require("child_process");
var dir = "./minified";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
} else {
  fs.rmSync(dir, { recursive: true ,force : true}, (err) => {
    if (err) {
      throw err;
    }
  });
  fs.mkdirSync(dir);
}

exec(
  "html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true ./build/index.html -o ./minified/index.html",
  (error, stdout, stderr) => {
    if (error) {
      console.log("error: " + error.message);
      return;
    }
    if (stderr) {
      console.log("stderr: " + stderr);
      return;
    }
    console.log("stdout: ");
    console.log(stdout)
  }
);
