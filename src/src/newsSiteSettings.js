exports = module.exports
const newsSites =
  [
    {
      domain: 'news.sky.com',
      homePage: {
        newsElementClass: 'sdc-news-story-grid__card',
        newsTitleClass: 'sdc-news-story-grid__link',
        specificArticleElement: 'sdc-news-article-header__headline',
        getTitle: function (parent) {
        		return parent.getElementsByClassName('sdc-news-story-grid__link')[0].href
        }
      },
      newsPage: {
      	getTitle: function () {
        		return window.location.href
      }
      }
    },
    {
      domain: 'tecnico.ulisboa.pt',
      homePage: {
        newsElementClass: 'blog-article',
        newsTitleClass: 'article-title',
        specificArticleElement: 'main-content',
        getTitle: function (parent) {
        		return parent.getElementsByTagName('a')[1].href
        }
      },
      newsPage: {
      	getTitle: function () {
        		return window.location.href
      }
      }
    }
  ]

exports.getWebsiteSettings = function () {
  let currDomain = window.location.host

  for (let i = 0; i < newsSites.length; i++) {
    if (currDomain == newsSites[i].domain) {
      return newsSites[i]
    }
  }
}
