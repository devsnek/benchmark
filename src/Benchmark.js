const { performance } = require('perf_hooks');
const { evaluate } = require('./statistics');
const { divisors } = require('./reference');

// 1% uncertainty with resolution of 5us
const minTime = 2.5;
const maxTime = 5.0;
const minSamples = 5;

class Benchmark {
  constructor(name, fn) {
    this.name = name;
    // this.fn = fn;
    this.fn = /^[^{]+\{([\s\S]*)\}\s*$/.exec(fn.toString().replace(/^\s+|\s+$/g, ''))[1];

    // this.sample = [];
    this.cycles = 0;
    this.count = 1;
    this.stats = {
      sample: [],
    };
    this.times = {
      start: 0,
      elapsed: 0,
    };
    this.running = false;
    this.hz = 0;
  }

  run() {
    if (this.running)
      return;
    this.running = true;
    this.times.start = performance.now();
    while (this.running)
      cycle(this);
    evaluate(this);
    return this;
  }

  toString() {
    const s = this.stats;
    const hz = s.hz;
    return `${this.name} x ${hz.toFixed(hz < 100 ? 2 : 0)} ops/sec \xb1${s.rme.toFixed(2)}% (${this.cycles} cycles)`;
  }

  inspect() {
    return this.toString();
  }
}

try {
  Benchmark.prototype[require('util').inspect.custom] = Benchmark.prototype.inspect;
} catch (err) {} // eslint-disable-line no-empty

function cycle(bench) {
  const clocked = clock(bench.fn, bench.count);
  bench.cycles++;
  let count = bench.count;

  let divisor;
  if (!clocked && (divisor = divisors[bench.cycles]) !== null)
    bench.count = Math.floor(4e6 / divisor);

  const period = clocked / count;
  const size = bench.stats.sample.push(period);
  bench.hz = 1 / period;

  count += Math.ceil((minTime - clocked) / (clocked / count));

  if (count === Infinity)
    bench.running = false;

  const n = performance.now();
  const maxedOut = size >= minSamples && (bench.times.elapsed += n - bench.times.start) / 1e9 > maxTime;
  if (maxedOut)
    bench.running = false;
}

function clock(src, count) {
  // eslint-disable-next-line no-new-func
  const fn = new Function('now', `
let i = ${count};
const start = now();
while (i--) { ${src} }
const end = now();
return end - start;`);
  return fn(performance.now);
}

module.exports = Benchmark;
