var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

const topic = 'fruit-of-the-day'
const topic2 = 'fruit-of-the-day2'
const topic3 = 'fruit-of-the-day3'
const msg = new Buffer('banana')

ipfs.pubsub.publish(topic, msg, (err) => {
  if (err) {
    throw err
  }
  console.log(msg)
  // msg was broadcasted
})

ipfs.pubsub.publish(topic2, msg, (err) => {
  if (err) {
    throw err
  }
  console.log(msg)
  // msg was broadcasted
})

ipfs.pubsub.publish(topic3, msg, (err) => {
  if (err) {
    throw err
  }
  console.log(msg)
  // msg was broadcasted
})
