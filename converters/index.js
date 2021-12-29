const path = require('path')

const ConvertersMap = {
  api: './api.js',
  apigroup: './api_group.js',
  apidescription: './api_description.js',
  apiparamexample: './api_param_example.js',
  apisuccessexample: './api_success_example.js',
  apiparam: './api_param.js',
  apiquery: './api_query.js'
}

module.exports.resolve = (elementName) => {
  return require(path.join(__dirname, ConvertersMap[elementName]))
}

module.exports.ConvertersMap = ConvertersMap