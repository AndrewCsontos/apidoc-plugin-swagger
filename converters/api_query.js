/**
 * get current pathItemObject and return modified by apidoc parsedElement
 * @param {Object} parsedElement apidoc parsed element
 * @param {Object} swaggerPathItemObject current swagger path Item object
 * @param {Array} urlParameters list of the parameters from the url (like /company:company/user/:user this would be [company, user]
 */
module.exports.init = (parsedElement, swaggerPathItemObject, urlParameters = []) => {
  if (!Array.isArray(swaggerPathItemObject.parameters)) {
    swaggerPathItemObject.parameters = []
  }

  swaggerPathItemObject.parameters.push({
    name: parsedElement.field,
    in: 'query',
    required: !parsedElement.optional,
    description: parsedElement.description,
    type: String(parsedElement.type).toLowerCase()
  })
  return swaggerPathItemObject
}
