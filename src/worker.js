const util = require('./util');

function child(d) {
  return new Promise((resolve) => {
    const c = require('child_process').fork(require.resolve('./worker.js'));
    c.once('message', (m) => {
      c.kill();
      resolve(m);
    });
    c.send(d);
  });
}

function worker(d) {
  const src = util.stringify(run);
  const url = window.URL.createObjectURL(new window.Blob([src]));
  const w = new window.Worker(url);
  return new Promise((resolve) => {
    w.onmessage = (e) => {
      w.terminate();
      resolve(e.data);
    };
    w.postMessage(d);
  });
}


if (typeof process !== 'undefined' && 'send' in process)
  run();
else if (typeof window !== 'undefined')
  module.exports = worker;
else
  module.exports = child;

function run() {
  let send;
  let performance;
  if (typeof self !== 'undefined') {
    send = self.postMessage;
    self.onmessage = (e) => onMessage(e.data);
    performance = self.performance;
  } else {
    send = process.send.bind(process);
    process.on('message', onMessage);
    performance = require('perf_hooks').performance;
  }

  const divisors = [null, 4096, 512, 64, 8, 0];

  const minTime = 2.5e9; // 2.5s in ns
  const maxTime = 7e9; // 7s in ns
  const minSamples = 5;

  let cycles = 0;
  let count = 1;
  let start = 0;
  let elapsed = 0;
  const sample = [];
  let running = false;

  function cycle() {
    cycles++;

    const clocked = clock();

    const period = clocked / count;
    const size = sample.push(period);

    let c = count;
    let divisor;
    if (!clocked && (divisor = divisors[cycles]) !== null)
      c = Math.floor(4e6 / divisor);
    c += Math.ceil((minTime - clocked) / period);
    if (c < count)
      count = c;

    if (count === Infinity)
      running = false;

    elapsed += performance.now() - start;
    const maxedOut = size >= minSamples && elapsed > maxTime;
    if (maxedOut)
      running = false;
  }

  let source = '';
  let setup = '';
  let teardown = '';

  function clock() {
    // eslint-disable-next-line no-new-func
    const fn = new Function('now',
      `let i = ${count};
${setup}
const start = now();
while (i--) { ${source} }
const end = now();
${teardown}
return end - start;
`);
    return (0, fn)(performance.now.bind(performance));
  }

  function onMessage(data) {
    if (running)
      return;
    running = true;

    source = data.source;
    if (data.setup)
      setup = data.setup;
    if (teardown)
      teardown = data.teardown;
    start = performance.now();
    while (running)
      cycle();

    send({ sample, cycles });
  }
}
