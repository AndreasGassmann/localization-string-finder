const fs = require('fs');
const recursive = require("recursive-readdir");

let readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf-8' }, (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}

let checkProjectForTranslations = async (projectPath, translationFile, ignoredDirectories = [], ignoredFiles = []) => {
  try {
    let strings = await readFile(translationFile);
    let json = JSON.parse(strings);
    let keys = Object.keys(json);
    let stringPresent = {};
    Object.keys(json).forEach(k => {
      stringPresent[k] = false;
    })
    let files = await recursive(projectPath); // Read all files from project
    files = files.filter(f => { // Filter out ignoredFiles
      let isIgnoredFile = false;
      ignoredFiles.forEach(ignoredEnding => {
        isIgnoredFile = isIgnoredFile || f.endsWith(ignoredEnding);
      })
      return !isIgnoredFile;
    });
    files = files.filter(f => { // Filter out ignoredDirectories
      let isIgnoredDirectory = false;
      ignoredDirectories.forEach(ignoredDirectory => {
        let path = projectPath + ignoredDirectory;
        isIgnoredDirectory = isIgnoredDirectory || f.startsWith(path);
      })
      return !isIgnoredDirectory;
    });

    for (let index in files) { // Iterate over all files
      let content = await readFile(files[index]);
      keys.forEach(k => { // Check if translation string is present in file
        if (content.indexOf(k) >= 0) {
          stringPresent[k] = files[index];
        }
      });
    };

    return stringPresent;
  } catch(e) {
    console.log(e);
  }
};

module.exports = checkProjectForTranslations;