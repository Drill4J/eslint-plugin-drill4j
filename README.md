# eslint-plugin-drill4j

Custom rules for Drill4J repositories

## Installation

You'll first need to install [ESLint](http://eslint.org):

```shell
npm i eslint --save-dev
```

Next, install `eslint-plugin-drill4j`:

```shell
npm install eslint-plugin-drill4j --save-dev
```

## Usage

Add `drill4j` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "drill4j"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "drill4j/license-header": ["error"],
    }
}
```

## Supported Rules

* `license-header` - check if the license header listed bellow is present at start of the file

```text
/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```
