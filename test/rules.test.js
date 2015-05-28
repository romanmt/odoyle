var Rules = require('rules');
require('should');

var defs = [
  {
    name: "Make 5 be 10",
    domain: "deposit",
    pre: function(data) {
      return data.value === 5
    },
    exec: function(data, cb) {
      data.value = 10
      cb(null, data)
    }
  }
]

describe("rules", function() {
  it("doesn't execute when pre condition is false", function(done) {
    var rules = Rules(defs)
    rules.push({value: 1}, function(err, result) {
      result.value.should.eql(1)
      done()
    })
  })

  it("executes when the pre condition is true", function(done) {
    var rules = Rules(defs)
    rules.push({value: 5}, function(err, result) {
      result.value.should.eql(10)
      done()
    })
  })

  it("only fires rule in the given domain", function(done) {
    defs.push({
      name: "Make 10 be 1, maybe",
      domain: "withdrawal",
      pre: function(data) {
        return data.value === 10 && data.option
      },
      exec: function(data, cb) {
        data.value = 1
        cb(null, data)
      }
    })
    var rules = Rules(defs)
    rules.push({value: 5, option: true, domain: 'deposit'}, function(err, res) {
      res.value.should.eql(10)
      done()
    })
  })

  it("executes multiple rules", function(done) {
    defs.push({
      name: "Make 10 be 1, maybe",
      pre: function(data) {
        return data.value === 10 && data.option
      },
      exec: function(data, cb) {
        data.value = 1
        cb(null, data)
      }
    })
    var rules = Rules(defs)
    rules.push({value: 5, option: true}, function(err, res) {
      res.value.should.eql(1)
      done()
    })
  })
})
