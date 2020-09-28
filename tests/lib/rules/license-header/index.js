const RuleTester = require("eslint").RuleTester;
const ruleTester = new RuleTester();

const fs = require('fs');
const path = require('path');

const validFile = fs.readFileSync(path.resolve(__dirname, './samples/valid.js')).toString('utf-8');
const validFormattingDifferentFile = fs.readFileSync(path.resolve(__dirname, './samples/valid-but-formatting-is-different.js')).toString('utf-8');
const invalidMissingFile = fs.readFileSync(path.resolve(__dirname, './samples/invalid-missing.js')).toString('utf-8');
const invalidMalformedFile = fs.readFileSync(path.resolve(__dirname, './samples/invalid-malformed.js')).toString('utf-8');

const licenseHeaderRule = require('../../../../lib/rules/license-header');
ruleTester.run("license-header", licenseHeaderRule, {
  valid: [
    {
      code: validFile,
    },
    {
      code: validFormattingDifferentFile,
    },
  ],

  invalid: [
    {
      code: invalidMissingFile,
      errors: [{ message: "License header is missing" }],
    },
    {
      code: invalidMalformedFile,
      errors: [{ message: "License header is malformed or missing" }],
    },
  ],
});
