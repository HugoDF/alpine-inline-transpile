# Alpine.js Inline Transpile

Transpile inline Alpine.js directive code

## Installation

alpine-inline-transpile is a PostHTML plugin.

You can install it as follows (ignore `posthtml` if it's already installed).

```sh
npm install --save-dev alpine-inline-transpile posthtml
# or
yarn add --dev alpine-inline-transpile posthtml
```

## Usage

```js
const posthtml = require('posthtml');
const inline = require('alpine-inline-transpile');

// `target` is an ECMAScript version
// see https://swc-project.github.io/docs/configuring-swc#jsctarget
posthtml([inline({target: 'es5'})])
  .process(
    `<div x-data="{ show: false }">
  <button @click="show = !show">
    Toggle
  </button>
  <div x-show="show">
    Can be toggled
  </div>
</div>`
  )
  .then(({html}) => {
    // Do something with the HTML
    console.log(html);
  });
```

### Options

- `target`: the ECMAScript version to target (see https://swc-project.github.io/docs/configuring-swc#jsctarget), for IE11 use "es5"


## Requirements

- Node 10
- Yarn 1.x or npm

## Setup

1. Clone the repository
2. Run `yarn` or `npm install` installs all required dependencies.

## npm scripts

> Equivalent `npm run <script>` should also work

- `yarn test` will run tests with uvu
- `yarn lint` will lint all of the files with [xo](https://github.com/xojs/xo)
- `yarn fmt` will run lint with `--fix` option on all the examples files (and tests).

## LICENSE

Code is licensed under the [MIT License](./LICENSE).

