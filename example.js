const checkTranslationStrings = require('./index');

let projectPath = __dirname + '/test/test_project/';
let translationFile = __dirname + '/test/test_project/translations/en.json';
let ignoredDirectories = ['translations/', 'ignoredDir/'];
let ignoredFiles = ['DS_Store', 'd.ts', 'ttf', 'woff', 'woff2', 'min.js', 'gif', 'jpg', 'jpeg', 'png', 'ico'];

;(async () => {
  let translationUsage = await checkTranslationStrings(projectPath, translationFile, ignoredDirectories, ignoredFiles);
  let keys = Object.keys(translationUsage);

  console.log(`There are ${ keys.length } strings in your project.`);
  console.log(`${ keys.filter(k => !translationUsage[k] ).length } of them are unused:\n`);

  Object.keys(translationUsage).forEach(s => { // Display result
    if (!translationUsage[s]) {
      console.log(s);
    }
  });
})();
