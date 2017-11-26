var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

const topic = 'fruit-of-the-day'
const topic2 = 'fruit-of-the-day2'
const topic3 = 'fruit-of-the-day3'

const receiveMsg = (msg) => {
  console.log(msg.data.toString())
}

ipfs.pubsub.subscribe(topic, receiveMsg)
ipfs.pubsub.subscribe(topic2, receiveMsg)
ipfs.pubsub.subscribe(topic3, receiveMsg)
