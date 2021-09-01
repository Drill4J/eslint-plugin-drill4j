/**
 * @fileoverview Rule to validate that license header is present
 */

 "use strict";

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 const licenseHeader = require('./header-text');
 
 module.exports = {
   meta: {
     type: "error",
 
     docs: {
       description: "disallow file without correct license header",
       category: "Formatting issues",
     },
 
     messages: {
       licenseHeaderIsMissing: "License header is missing",
       licenseHeaderIsMalformedOrMissing: "License header is malformed or missing",
     },
 
     fixable: "whitespace",
   },
 
   create(context) {
 
     return {
       Program(programNode) {
         const comments = context.getAllComments();
         if (!Array.isArray(comments) || comments.length === 0) {
           context.report({
             node: programNode,
             messageId: 'licenseHeaderIsMissing',
             fix: insertLicenseHeader(programNode)
           })
           return;
         }
 
         const firstComment = normalizeFormatting(comments[0].value)
         const expectedComment = normalizeFormatting(licenseHeader.filter(x => !!x).join(' '))
         
         if (firstComment !== expectedComment) {
           context.report({
             node: programNode,
             messageId: 'licenseHeaderIsMalformedOrMissing',
             suggest: [
               {
                   desc: "Add the an appropriate license header",
                   fix: insertLicenseHeader(programNode)
               },
             ]
           })
         }
       },
     };
   },
 };
 
 function unifyLineEndings(str) {
   // reference https://www.ecma-international.org/ecma-262/10.0/#sec-line-terminators
   const LF = '\u000A';
   const CRLF = '\u000D\u000A';
   const LS = '\u2028';
   const PS = '\u2028';
   return str.replace(RegExp(`(${CRLF}|${LS}|${PS})`, 'g'), LF);
 }
 
 function normalizeFormatting(text) {
   return unifyLineEndings(text)
   // remove extra * (might be added with a newline within comment)
   .replace(/\*/g,'')
   // replace whitespaces and newlines with whitespaces
   .replace(/\s\s+/g, ' ')
   .trim();
 }
 
 function insertLicenseHeader (node) {
   return function (fixer) {
     return fixer.insertTextBefore(node, `/*\n * ${licenseHeader.join('\n * ')}\n */\n`)
   }
 }
 