/**
 * @fileoverview Rule to validate that license header is present
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
  },

  create(context) {
    function report(node, messageId) {
      context.report({ node, messageId });
    }

    function unifyLineEndings(str) {
      // reference https://www.ecma-international.org/ecma-262/10.0/#sec-line-terminators
      const LF = '\u000A';
      const CRLF = '\u000D\u000A';
      const LS = '\u2028';
      const PS = '\u2028';
      return str.replace(RegExp(`(${CRLF}|${LS}|${PS})`, 'g'), LF);
    }

    return {
      Program(programNode) {
        const comments = context.getAllComments();
        if (!Array.isArray(comments) || comments.length === 0) {
          report(programNode, 'licenseHeaderIsMissing');
          return;
        }

        // get the first comment and get rid of formatting oddities
        const firstComment = 
          unifyLineEndings(comments[0].value)
          // remove extra * (might be added with a newline within comment)
          .replace(/\*/g,'')
          // replace whitespaces and newlines with whitespaces
          .replace(/\s\s+/g, ' ')
          .trim();
        const licenseHeader = "Copyright 2020 EPAM Systems Licensed under the Apache License, Version 2.0 (the \"License\"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.";
        
        if (firstComment !== licenseHeader) {
          report(programNode, 'licenseHeaderIsMalformedOrMissing')
        }
      },
    };
  },
};
