var Promise = require('promise')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const serverAddress = 'http://localhost:8088/'

function storeItem (key, item) {
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

function getItemFromStorage (key) {
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

/* storeItem('asd', 'das').then(console.log).catch((err) => {
  console.log(err)
})
*/
getItemFromStorage('asd').then(console.log).catch((err) => {
  console.log(err)
})
