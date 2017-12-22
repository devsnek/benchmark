const { tTable } = require('./reference');

function getMean(sample) {
  return sample.reduce((sum, x) => sum + x, 0) / sample.length || 0;
}

function evaluate(bench) {
  const sample = bench.stats.sample;

  const mean = getMean(sample);

  const variance =
    sample.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (sample.length - 1) || 0;

  const sd = Math.sqrt(variance);

  const sem = sd / Math.sqrt(sample.length);

  const critical = tTable[Math.round(sample.length - 1) || 1] || tTable[Infinity];

  const moe = sem * critical;

  const rme = (moe / mean) * 100 || 0;

  const hz = 1 / mean;

  return Object.assign(bench.stats, {
    deviation: sd,
    mean,
    moe,
    rme,
    sem,
    variance,
    hz,
  });
}

module.exports = { evaluate, getMean };
