'use strict'
var exports = module.exports = {}

const defaultValue = true

const homePageDefaultValues2 = {
  newsElementClass: 'homepage-news-element',
  newsTitleClass: 'homepage-news-title'
}

const homePageDefaultValues = {
  newsElementClass: 'blog-article',
  newsTitleClass: 'article-title'
}

exports.getNewsItems = function (documentObj) {
  return documentObj.getElementsByClassName(homePageDefaultValues.newsElementClass)
}

exports.getTitleElement = function (parent) {
  return parent.getElementsByClassName(homePageDefaultValues.newsTitleClass)[0].innerText
}

exports.cleanTitle = function (title) {
  return title.replace(/\W/g, '').toLowerCase()
}
