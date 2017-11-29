var Promise = require('promise')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// const serverAddress = 'http://localhost:8088/'
const serverAddress = 'http://146.193.41.153:8088/'

var exports = module.exports = {}

exports.storeItem = function (key, item) {
  return new Promise(function (resolve, reject) {
    var data = null
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = false

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        var value = this.responseText
        console.log(value)
        resolve(value)
      }
    })

    var request = serverAddress + 'update?article=' + key + '&&link=' + item

	    console.log('RESQUESTING:  \n' + request)

	    xhr.open('GET', request)
	    xhr.setRequestHeader('content-type', 'application/javascript')
	    xhr.send(data)
  })
}

exports.getItemFromStorage = function (key) {
  return new Promise(function (resolve, reject) {
    var data = null
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = false

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        var value = this.responseText
        console.log(value)
        resolve(value)
      }
    })

    var request = serverAddress + 'getlink?article=' + key

	    console.log('RESQUESTING:  \n' + request)

	    xhr.open('GET', request)
	    xhr.setRequestHeader('content-type', 'application/javascript')
	    xhr.send(data)
  })
}
