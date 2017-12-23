const { evaluate } = require('./statistics');
const worker = require('./worker');
const util = require('./util');

class Benchmark {
  constructor(name, fn, { setup, teardown } = {}) {
    this.name = name;
    this.source = util.stringify(fn);
    this.setup = setup ? util.stringify(setup) : undefined;
    this.teardown = teardown ? util.stringify(teardown) : undefined;

    this.stats = undefined;
    this.sample = undefined;
    this.cycles = undefined;
  }

  async run() {
    const { sample, cycles } = await worker({
      source: this.source,
      setup: this.setup,
      teardown: this.teardown,
    });
    this.sample = sample;
    this.cycles = cycles;
    this.stats = evaluate(this);
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

module.exports = Benchmark;
