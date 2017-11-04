 // var serverAddress = 'http://146.193.41.153:8092/'
var serverAddress = 'http://localhost:8092/'

function sendMessage (name) {
  var data = null

  var xhr = new XMLHttpRequest()
  xhr.withCredentials = false

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      alert(this.responseText)
      console.log(this.response)
    }
  })
// application/javascript
        // http://146.193.41.153:8092/verify?claim=veryfake&article=jn_99
  var claim = name
  // var article_url = window.location.href
  // var serverAddress = "http://turbina.gsd.inesc-id.pt:8092"
  var title = document.getElementsByClassName('post-heading')[0].getElementsByTagName('h1')[0].innerHTML
  var strippedTitle = title.replace(/\W/g, '').toLowerCase()
  var articleId = Sha256.hash(strippedTitle)

  var request = serverAddress + 'verify?claim=' + claim + '&article=' + articleId

  console.log('REQUEST::::::     ' + request)

  xhr.open('GET', request)
  xhr.setRequestHeader('content-type', 'application/javascript')

        // xhr.setRequestHeader("postman-token", "9478c587-f2da-2c03-fe1a-5747306ae18f");

  xhr.send(data)
}
