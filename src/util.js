exports.stringify = (fn) => typeof fn === 'string' ? fn :
  /^[^{]+\{([\s\S]*)\}\s*$/.exec(fn.toString().replace(/^\s+|\s+$/g, ''))[1];
