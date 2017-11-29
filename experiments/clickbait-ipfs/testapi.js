var ipfsBridge = require('./testapp.js')

// Test claims
var vc = {claim: 'fake',
  url: 'jn2',
  ip: '192.168'}

var array1 = []

array1.push(vc)

ipfsBridge.addItem('jn2', array1).then(console.log).then(value => {
  ipfsBridge.getItem('jn2').then(console.log)
})
