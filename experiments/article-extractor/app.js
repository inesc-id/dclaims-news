var extractor = require('article-extractor')

extractor.extractData('https://www.dinheirovivo.pt/empresas/pingo-doce-propoe-falsos-estagios-verao-no-algarve/?utm_campaign=Echobox&utm_content=JornaldeNoticias&utm_medium=Social&utm_source=Facebook#link_time=1496575195', function (err, data) {
  console.log(data.content.toString('utf-8'))
})
