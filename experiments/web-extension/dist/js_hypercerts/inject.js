var s1 = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>'
var s2 = '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>'
var s3 = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">'

var xmlString = s1,
  parser = new DOMParser(),
  doc = parser.parseFromString(xmlString, 'text/xml')

document.getElementsByTagName('head')[0].appendChild(doc.firstChild)

xmlString = s2,
  parser = new DOMParser(),
  doc = parser.parseFromString(xmlString, 'text/xml')

document.getElementsByTagName('head')[0].appendChild(doc.firstChild)

xmlString = s3,
  parser = new DOMParser(),
  doc = parser.parseFromString(xmlString, 'text/xml')

document.getElementsByTagName('head')[0].appendChild(doc.firstChild)

console.log('INJECTIIIIIIING')
console.log('ZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZZzzZZzZZZZzzZZ')
