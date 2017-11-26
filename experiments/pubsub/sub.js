var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

const topic = 'f65bded9dff8a564d4d0e601f76c206334962dc0072555ed811c6b3f1bebb2e71'
const topic2 = 'fruit-of-the-day21'
const topic3 = 'fruit-of-the-day31'

const receiveMsg = (msg) => {
  console.log(msg.data.toString())
}

ipfs.pubsub.subscribe(topic, {discover: true}, receiveMsg)
ipfs.pubsub.subscribe(topic2, {discover: true}, receiveMsg)
ipfs.pubsub.subscribe(topic3, {discover: true}, receiveMsg)
