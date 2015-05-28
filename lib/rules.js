var async = require('async');
var _ = require('lodash');

module.exports = function(defs) {
  return async.queue(function(data, cb){
    var clone = _.clone(data)
    var dom = _.filter(defs, function(rule) {
      if (!data.domain || rule.domain === data.domain)
        return rule
    })
    async.eachSeries(dom, function(rule, next) {
      if(rule.pre(clone)){
        console.log("Executing: " + rule.name);
        rule.exec(clone, next)
      }
      else
        next()
    }, function(err) {
     cb(err, clone)
    })
  }, 3)
}

