import {test} from 'uvu';
import * as assert from 'uvu/assert';
import run from './run';
import {showHide} from './fixtures';

test('simple toggle', async () => {
  assert.snapshot(
    await run(showHide, {target: 'es2016'}),
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

test.run();
