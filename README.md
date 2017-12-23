[![npm][download-badge]][npm]
[![David][dep-badge]][dep-link]

[![NPM][large-badge]][stats-link]

# benchmark <sup>[![Version Badge][version-badge]][npm]</sup>

#### This package is still very experimental

```javascript
const Benchmark = require('@snek/benchmark');

const s = new Benchmark.Suite({
  setup: () => { const S = 'Hello, World!'; },
});

s.add('RegExp#test', () => { /o/.test(S); });
s.add('String#indexOf', () => { !!S.indexOf('o'); });
s.add('String#includes', () => { S.includes('o'); });

s.on('cycle', console.log);

s.run();
```

All tests are run in a child process or a worker, depending on the context.
Because of this the inner body of a test is disconnected from the scope where it is defined;
using the setup and teardown options is essential in these cases.

Also available through [unpkg][unpkg-link] and [jsdelivr][jsdelivr-link].

[npm]: https://npmjs.org/package/@snek/benchmark
[large-badge]: https://nodei.co/npm/@snek/benchmark.png?downloads=true&downloadRank=true&stars=true
[stats-link]: https://nodei.co/npm/@snek/benchmark/
[version-badge]: http://versionbadg.es/devsnek/benchmark.svg
[download-badge]: https://img.shields.io/npm/dt/@snek/benchmark.svg?maxAge=3600
[dep-badge]: https://david-dm.org/devsnek/benchmark.svg
[dep-link]: https://david-dm.org/devsnek/benchmark
[unpkg-link]: https://unpkg.com/
[jsdelivr-link]: https://www.jsdelivr.com/
