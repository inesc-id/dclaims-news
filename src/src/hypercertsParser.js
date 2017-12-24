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

const newsPageDefaultValues = {
  newsTitleClass: ''
}

exports.getNewsItems = function (documentObj) {
  return documentObj.getElementsByClassName(homePageDefaultValues.newsElementClass)
}

/*
exports.getTitleElement = function (parent) {
  if (window.location.href.toString().includes('campus-community')) {
    console.log('Getting By Tag nameeee')
    return parent.getElementsByClassName('main-content')[0].getElementsByClassName('container')[0].getElementsByClassName('row')[0].getElementsByTagName('h1')[0].innerHTML
  } else {
    return parent.getElementsByClassName(homePageDefaultValues.newsTitleClass)[0].innerText
  }
}
*/
exports.getTitleElement = function (parent) {
  if (parent.getElementsByClassName('main-content').length > 0) {
    console.log('Detected: News-Page')
    return parent.getElementsByClassName('main-content')[0].getElementsByClassName('container')[0].getElementsByClassName('row')[0].getElementsByTagName('h1')[0].innerHTML
  } else {
    console.log('Detected: Home-Page')
    return parent.getElementsByClassName(homePageDefaultValues.newsTitleClass)[0].innerText
  }
}

exports.cleanTitle = function (title) {
  return title.replace(/\W/g, '').toLowerCase()
}

/*

document.getElementsByClassName("main-content")[0].getElementsByClassName("container")[0].getElementsByClassName("row")[0].getElementsByTagName("h1")[0].innerHTML

window.location.href.toString().includes("campus-community")
*/
