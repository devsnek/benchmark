const EventEmitter = require('events');
const Benchmark = require('./Benchmark');

class Suite extends EventEmitter {
  constructor({ setup, teardown } = {}) {
    super();
    this.benches = [];
    this.setup = setup;
    this.teardown = teardown;
  }

  add(name, fn) {
    this.benches.push(new Benchmark(name, fn, {
      setup: this.setup,
      teardown: this.teardown,
    }));
    return this;
  }

  async run() {
    await Promise.all(this.benches.map(async(b) => {
      await b.run();
      this.emit('cycle', b);
    }));
    return this;
  }
}

module.exports = Suite;
