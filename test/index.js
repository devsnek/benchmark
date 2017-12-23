const { Suite } = require('../src');

const s = new Suite({
  setup: () => { const S = 'Hello, World!'; },
});

s.add('RegEx#test', () => { /o/.test(S); });
s.add('String#indexOf', () => { !!S.indexOf('o'); });
s.add('String#includes', () => { S.includes('o'); });

s.on('cycle', console.log);

s.run();
