var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

const topic = 'f65bded9dff8a564d4d0e601f76c206334962dc0072555ed811c6b3f1bebb2e7'
const topic2 = 'fruit-of-the-day2'
const topic3 = 'fruit-of-the-day3'
const msg = new Buffer('banana')
const msg2 = new Buffer('AAAAded9dff8a564d4d0e601f76c206334962dc0072555ed811c6b3f1bebb2e7')

function sendMsg () {
  ipfs.pubsub.publish(topic, msg2, (err) => {
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
}

setInterval(sendMsg, 5 * 1000)
