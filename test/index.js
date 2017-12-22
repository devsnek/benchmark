const { Suite } = require('../src');

const s = new Suite();

s.add('RegEx#test', () => { /o/.test('Hello, World!'); });
s.add('String#indexOf', () => { ~~'Hello, World'.indexOf('o'); });
s.add('String#includes', () => { 'Hello, World!'.includes('o'); });

s.on('cycle', console.log);

s.run();
