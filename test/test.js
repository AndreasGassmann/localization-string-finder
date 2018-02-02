import test from 'ava';
const checkTranslationStrings = require('../index');

let projectPath = __dirname + '/test_project/';
let translationFile = __dirname + '/test_project/translations/en.json';
let ignoredDirectories = ['translations/', 'ignoredDir/'];
let ignoredFiles = ['DS_Store', 'd.ts', 'ttf', 'woff', 'woff2', 'min.js', 'gif', 'jpg', 'jpeg', 'png', 'ico'];

test('are strings are present if nothing is ignored', async t => {
  let stringResults = await checkTranslationStrings(projectPath, translationFile);
	t.truthy(stringResults['TEST.STRING']);
	t.truthy(stringResults['TEST.STRING_2']);
	t.truthy(stringResults['TEST.STRING_NOT_USED_FILE']);
	t.truthy(stringResults['TEST.STRING_NOT_USED_DIR']);
});

test('should ignore ignoredDirectories', async t => {
  let stringResults = await checkTranslationStrings(projectPath, translationFile, ignoredDirectories);
	t.truthy(stringResults['TEST.STRING']);
	t.truthy(stringResults['TEST.STRING_2']);
  t.false(stringResults['TEST.STRING_NOT_USED_DIR'], __dirname + '/test_project/ignoredDir/ignored.js');
});

test('should ignore ignoredFiles', async t => {
  let stringResults = await checkTranslationStrings(projectPath, translationFile, ignoredDirectories, ignoredFiles);
	t.truthy(stringResults['TEST.STRING']);
  t.truthy(stringResults['TEST.STRING_2']);
	t.false(stringResults['TEST.STRING_NOT_USED_FILE']);
});

test('should match right files and ignore others', async t => {
  let stringResults = await checkTranslationStrings(projectPath, translationFile, ignoredDirectories, ignoredFiles);
	t.truthy(stringResults['TEST.STRING']);
  t.truthy(stringResults['TEST.STRING_2']);
  t.false(stringResults['TEST.STRING_NOT_USED_DIR']);
	t.false(stringResults['TEST.STRING_NOT_USED_FILE']);
});