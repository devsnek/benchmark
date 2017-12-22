const EventEmitter = require('events');
const Benchmark = require('./Benchmark');

class Suite extends EventEmitter {
  constructor() {
    super();
    this.benches = [];
  }

  add(name, fn) {
    this.benches.push(new Benchmark(name, fn));
    return this;
  }

  run() {
    for (const bench of this.benches) {
      bench.run();
      this.emit('cycle', bench);
    }
    return this;
  }
}

module.exports = Suite;
