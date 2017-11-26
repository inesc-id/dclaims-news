var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

//const topic = 'f65bded9dff8a564d4d0e601f76c206334962dc0072555ed811c6b3f1bebb2e7'
const topic2 = 'fruit-of-the-day2'
const topic3 = 'fruit-of-the-day3'
const msg = new Buffer('banana')
const msg2 = new Buffer('AAAAded9dff8a564d4d0e601f76c206334962dc0072555ed811c6b3f1bebb2e7')



function storeItem(key,ipfsLink){
	let topic = key
	let message = new Buffer(ipfsLink)

	ipfs.pubsub.publish(topic, msg, (err) => {
	  if (err) {
	    throw err
	  }
	  console.log(msg)
	  // msg was broadcasted
	})
}


const receiveMsg = (msg) => {
  console.log(msg.data.toString())
}





function getItemFromStorage(topic){

	ipfs.pubsub.subscribe(topic, {discover: true}, receiveMsg)

}




function updateRegistry (key, ipfsLink) {
  return new Promise(function (resolve, reject) {
    storeItem(key, ipfsLink).then(value => {
      resolve(value)
    })
  })
}

function getLinkFromRegistry (key) {
  return new Promise(function (resolve, reject) {
    try {
      getItemFromStorage(key).then(link => {
        if (link) {
          console.log('LINK: ' + JSON.stringify(link))
          resolve(link)
        } else {
          console.log('No Key')
          resolve(null)
        }
      })
    } catch (err) {
      console.log('Error getting key')
      resolve(null)
    }
  })
}






ipfs.pubsub.publish(topic, msg2, (err) => {
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


