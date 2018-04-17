exports = module.exports

/*
 * Info wars
 * Article class: "article"
 * href: element(article).getElementsByTagName("a")[0]
 * document.getElementsByClassName("article")[0].getElementsByTagName("a")[0]
 * specific article element: document.getElementById("article-header")
*/

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
    }, {
      domain: 'turbina.gsd.inesc-id.pt:8765',
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
    }, {
      domain: 'www.nytimes.com',
      homePage: {
        newsElementClass: 'story',
        newsTitleClass: 'story-heading',
        specificArticleElement: 'theme-main',
        getTitle: function (parent) {
          if (parent.getElementsByClassName('story-heading').length > 0) {
            return parent.getElementsByClassName('story-heading')[0].getElementsByTagName('a')[0].href
          }
        }
      },
      newsPage: {
        getTitle: function () {
          return window.location.href
        }
      }
    }
  ]

/*
for(let i=0;i<a.length;i++){
if(a[i].getElementsByClassName("card__link").length >0){
console.log(a[i].getElementsByClassName("card__link")[0].href)}
}

*/

exports.getWebsiteSettings = function () {
  let currDomain = window.location.host

  for (let i = 0; i < newsSites.length; i++) {
    if (currDomain == newsSites[i].domain) {
      return newsSites[i]
    }
  }
}
