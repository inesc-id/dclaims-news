var storage = require('node-persist')

var ipfsStorage = require('./ipfsstorage.js')

function handleVerification (nkey, newClaim) {
  return new Promise(function (fulfill, reject) {
    var newClaimArray = []
    newClaimArray.push(newClaim)

    ipfsStorage.getItem(nkey).then(value => {
      var newClaimsList
      if (value) {
        console.log('Appending...')
        newClaimsList = value[1].concat(newClaimArray)
      } else {
        console.log('Creating new list')
        newClaimsList = newClaimArray
      }
      return ipfsStorage.addItem(nkey, newClaimsList)
    }).then(value => {
      console.log('Sucess \n' + value)
      fulfill('Sucess :)')
    })
  })
}

function getClaimsJSONByUrl (url) {
  return new Promise(function (fulfill, reject) {
    ipfsStorage.getItem(url).then(value => {
      var claimsJSON = {}
      claimsJSON.claimsList = value
      fulfill(claimsJSON)
    })
  })
}

function getClaimsCountsJSONByUrl (url) {
  return new Promise(function (fulfill, reject) {
    ipfsStorage.getItem(url).then(values => {
      if (values) {
        fulfill(values[1].length)
                // fulfill("3")
      } else {
        fulfill('0')
      }
    })
  })
}

var vc3 = {claim: 'CC',
  url: 'CC',
  ip: 'CC'}

/*
getClaimsJSONByUrl("http://turbina.gsd.inesc-id.pt:8095/post.html").then(value=>{

    cleanList = value["claimsList"][1]
    console.log(cleanList.length)

    for(let i=0;i<cleanList.length;i++){
        //console.log(cleanList[i])
        console.log("-----CLAIM #"+i+"-----")
        console.log("Text: \n"+cleanList[i]["claim"])
        console.log("User: "+cleanList[i]["ip"])
    }
})
*/

var array1 = new Array()
var newClaim = new Array()

var vc = {claim: 'fake',
  url: 'jn1',
  ip: '192.168'}

var vc2 = {claim: 'faked',
  url: 'jn2',
  ip: '192.16dd8'}

var vc3 = {claim: 'CC',
  url: 'CC',
  ip: 'CC'}

array1.push(vc)
array1.push(vc2)

newClaim.push(vc3)

var nkey = 'f65bded9dff8a564d4d0e601f76c206334962dc0072555ed811c6b3f1bebb2e7'

function printStorage () {
  storage.init().then(function () {
    var keys = storage.keys()

    for (let i = 0; i < keys.length; i++) {
      console.log(keys[i] + ' -> ' + storage.get(keys[i]))
    }
  })
}

printStorage()
/* handleVerification(nkey, vc).then(console.log).catch((err) => {
  console.log(err)
})

*/
/*

//addItem("2",array).then(console.log)
getItem("2").then(function (value) {
    value.push("hello")

    return value
}).then(value=>{
    return addItem("3",value)
}).then(console.log)

array.push(vc)
array.push(vc2)

console.log(array)

storage.setItemSync("array",array)

var newarray = storage.getItemSync("array")

newarray.push("hello")

console.log(newarray)

    */
