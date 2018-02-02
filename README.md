# translation-string-finder

A simple package that checks if your translation strings are still used in your project. All it does is simple string-matching, so if your translation keys are common words it might not work as expected.

Format of the translation file:

```json
{
  "GLOBAL.GREETING": "Welcome!",
  "GLOBAL.NAME": "Name"
}
```

Installation:

```bash
npm i --save-dev translation-string-finder
```
Basic usage:

```javascript

const checkTranslationStrings = require('translation-string-finder');

let projectPath = __dirname + '/test/test_project/';
let translationFile = __dirname + '/test/test_project/translations/en.json';
let ignoredDirectories = ['translations/', 'ignoredDir/'];
let ignoredFiles = ['DS_Store', 'd.ts', 'ttf', 'woff', 'woff2', 'min.js', 'gif', 'jpg', 'jpeg', 'png', 'ico'];

;(async () => {
  let translationUsage = await checkTranslationStrings(projectPath, translationFile, ignoredDirectories, ignoredFiles);
  console.log(translationUsage);
});

```