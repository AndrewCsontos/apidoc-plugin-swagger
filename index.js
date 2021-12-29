const path = require('path')
const fs = require('fs')
const converter = require('./converters')
const {pathToRegexp} = require('path-to-regexp');
const process = require("process")

let app = {}
let swaggerObj = {}
let counter = 0
/**
 * Hook overview: https://github.com/apidoc/apidoc-core/hooks.md
 */
module.exports = {
 
  init: function(_app) {
    app = _app;

    // Hooks
    app.addHook('parser-find-elements', parserFindElements)

    swaggerObj.info = {
      title: app.packageInfos.title || 'My API',
      version: app.packageInfos.version || '1.0.0',
      description: app.packageInfos.description || 'My REST API Documentation',
    }
    swaggerObj.basePath = app.packageInfos.url || '/'
    swaggerObj.swagger = '2.0'
    swaggerObj.paths = {}
    swaggerObj.definitions = {}
  }
}

let pushKey = null
let pushMethod = null

function uriPathToSwagger(url) {
  var pattern = pathToRegexp(url, null);
  var matches = pattern.exec(url);

  // Surrounds URL parameters with curly brackets -> :email with {email}
  for (var j = 1; j < matches.length; j++) {
    var key = matches[j].substr(1);
    url = url.replace(matches[j], "{"+ key +"}");
  }
  return url;
}


// iterate over all elements
function parserFindElements(elements, element, block, filename) {
  counter++
  /**
   * element object properties:
   * source, name, sourceName, content
  */
  try {
    const elementParser = require(path.join(__dirname, 'node_modules/apidoc-core/lib', app.parsers[element.name]))
    const parsedElement = elementParser.parse(element.content, element.source)

    if (element.name === 'api') {
      pushKey = uriPathToSwagger(parsedElement.url);
      pushMethod = String(parsedElement.type).toLowerCase()
      swaggerObj.paths[pushKey] = {}
      swaggerObj.paths[pushKey][pushMethod] = {}
    }

    // check for supported elements
    if (element.name && Object.keys(converter.ConvertersMap).includes(element.name)) {
      swaggerObj.paths[pushKey][pushMethod] = converter.resolve(element.name).init(parsedElement, swaggerObj.paths[pushKey][pushMethod])
    }
  } catch (err) {
    console.error('OOPS! errored element: '+JSON.stringify(element.name)+' in filename: '+filename)
    console.error(err)
  }
  return elements;
}

process.on('exit', (code) => {
  // triggered from apidoc when proccess finished successfully
  // TODO: provide callback when apidoc works finished (this event called only when we use cli)
  if (code === 0 && counter > 0 && (process.argv.includes('-o') || process.argv.includes('--output'))) {
    console.log(`[apidoc-plugin-swagger] parse and convert ${counter} element${(counter == 1) ? '' : 's'} to swagger format`)

    function getOutputFile() {
      let outFlagIndex = process.argv.indexOf('-o')
      if (outFlagIndex === -1) {
        outFlagIndex = process.argv.indexOf('--output')
      }
      let outDir = process.argv[outFlagIndex + 1];
      if (!outDir.startsWith(process.cwd())){
        outDir = path.join(process.cwd(), outDir);
      }
      return  path.join(outDir, 'swagger.json')
    }

    const destinationFilePath = getOutputFile();
    console.log(`[apidoc-plugin-swagger] going to save at path: ${destinationFilePath}`)

    fs.writeFileSync(destinationFilePath, JSON.stringify(swaggerObj, null, 2), 'utf8')
    
    console.log(`[apidoc-plugin-swagger] swagger.json spec file saved successfully`)
  }
})
