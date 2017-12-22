[![npm][download-badge]][npm]
[![David][dep-badge]][dep-link]

[![NPM][large-badge]][stats-link]

# benchmark <sup>[![Version Badge][version-badge]][npm]</sup>

#### This package is still very experimental

```javascript
const Benchmark = require('@snek/benchmark');

const s = new Benchmark.Suite();

s.add('RegExp#test', () => { /o/.test('Hello, World!'); });
s.add('String#indexOf', () => { !!'Hello, World'.indexOf('o'); });
s.add('String#includes', () => { 'Hello, World!'.includes('o'); });

s.on('cycle', console.log);

s.run();
```

Also available through [unpkg][unpkg-link] and [jsdelivr][jsdelivr-link].

[npm]: https://npmjs.org/package/@snek/benchmark
[large-badge]: https://nodei.co/npm/@snek/benchmark.png?downloads=true&downloadRank=true&stars=true
[stats-link]: https://nodei.co/npm/@snek/benchmark/
[version-badge]: http://versionbadg.es/devsnek/benchmark.svg
[download-badge]: https://img.shields.io/npm/dt/@snek/benchmark.svg?maxAge=3600
[dep-badge]: https://david-dm.org/guscaplan/benchmark.svg
[dep-link]: https://david-dm.org/guscaplan/benchmark
[unpkg-link]: https://unpkg.com/
[jsdelivr-link]: https://www.jsdelivr.com/
