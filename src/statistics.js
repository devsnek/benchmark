const tTable = {
  1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447,
  7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228, 11: 2.201, 12: 2.179,
  13: 2.16, 14: 2.145, 15: 2.131, 16: 2.12, 17: 2.11, 18: 2.101,
  19: 2.093, 20: 2.086, 21: 2.08, 22: 2.074, 23: 2.069, 24: 2.064,
  25: 2.06, 26: 2.056, 27: 2.052, 28: 2.048, 29: 2.045, 30: 2.042,
  Infinity: 1.96,
};

function getMean(sample) {
  return sample.reduce((sum, x) => sum + x, 0) / sample.length || 0;
}

function evaluate(bench) {
  const sample = bench.sample;

  const mean = getMean(sample);

  const variance =
    sample.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (sample.length - 1) || 0;

  const sd = Math.sqrt(variance);

  const sem = sd / Math.sqrt(sample.length);

  const critical = tTable[Math.round(sample.length - 1) || 1] || tTable[Infinity];

  const moe = sem * critical;

  const rme = (moe / mean) * 100 || 0;

  const hz = 1 / mean;

  return {
    deviation: sd,
    mean,
    moe,
    rme,
    sem,
    variance,
    hz,
  };
}

module.exports = { evaluate, getMean };
