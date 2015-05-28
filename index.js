var rules = require('rules');

module.exports = function(file) {
  var defs = require(file)
  return rules(defs)
}

