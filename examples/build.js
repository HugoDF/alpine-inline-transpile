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
