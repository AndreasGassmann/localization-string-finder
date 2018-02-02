let projectPath = __dirname + '/test/test_project/';
let translationFile = __dirname + '/test/test_project/translations/en.json';
let ignoredDirectories = ['translations/', 'ignoredDir/'];
let ignoredFiles = ['DS_Store', 'd.ts', 'ttf', 'woff', 'woff2', 'min.js', 'gif', 'jpg', 'jpeg', 'png', 'ico'];

const checkTranslationStrings = require('./index');

;(async () => {
  let stringResults = await checkTranslationStrings(projectPath, translationFile, ignoredDirectories, ignoredFiles);
  let keys = Object.keys(stringResults);

  console.log(`There are ${ keys.length } strings in your project.`);
  console.log(`${ keys.filter(k => !stringResults[k] ).length } of them are unused:\n`);

  Object.keys(stringResults).forEach(s => { // Display result
    if (!stringResults[s]) {
      console.log(s);
    }
  });
})();
