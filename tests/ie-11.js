import {test} from 'uvu';
import * as assert from 'uvu/assert';
import run from './run.js';
import {showHide, arrowFuncNoThis, arrowFuncThis} from './fixtures.js';

test('defaults to IE11', async () => {
  assert.equal(await run(showHide), await run(showHide, {target: 'es5'}));
});

test('IE11 keeps simple toggle', async () => {
  assert.snapshot(
    await run(showHide, {target: 'es5'}),
    `<div x-data="{
    show: false
};">
  <button @click="show = !show;">
    Toggle
  </button>
  <div x-show="show;">
    Can be toggled
  </div>
</div>`
  );
});

test('IE11 - arrow functions no `this`', async () => {
  assert.snapshot(
    await run(arrowFuncNoThis, {target: 'es5'}),
    `<div x-data="{
    show: false
};" x-init="$watch('show', function(val) {
    return console.log(val);
});">
  <button x-on:click="show = !show;">
    Toggle
  </button>
</div>`
  );
});

test('IE11 - arrow functions with `this`', async () => {
  assert.snapshot(
    await run(arrowFuncThis, {target: 'es5'}),
    `<div x-data="{
    show: false
};" x-init="$nextTick((function() {
    this.show = true;
}).bind(this));">
  <button x-on:click="show = !show;">
    Toggle
  </button>
</div>`
  );
});

test.run();
