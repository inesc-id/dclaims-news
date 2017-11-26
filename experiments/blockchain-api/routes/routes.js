var storage = require('node-persist')

function storeItem (key, item) {
  return new Promise(function (fulfill, reject) {
    storage.init().then(function () {
      storage.setItem(key, item).then(function (value) {
        if (value) {
          fulfill([key, value])
        } else {
          fulfill(null)
        }
      })
    })
  })
}

function getItemFromStorage (key) {
  return new Promise(function (fulfill, reject) {
    storage.init().then(function () {
      storage.getItem(key).then(function (value) {
        if (value) {
          fulfill(value)
        } else {
          fulfill(null)
        }
      })
    })
  })
}

var appRouter = function (app) {
  app.get('/update', function (req, res) {
  	var req_article = req.query.article
  	var req_link = req.query.link
  	storeItem(req_article, req_link).then(value => {
  		res.send('yey')
  	}).catch((err) => {
    console.log(err)
  })
  })

  app.get('/getlink', function (req, res) {
  	var req_article = req.query.article

  	getItemFromStorage(req_article.toString()).then(value => {
  		console.log('value ' + value)
  		res.send(value)
  	})
  })
}
module.exports = appRouter
