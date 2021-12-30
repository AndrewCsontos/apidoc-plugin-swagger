/**
 * get current pathItemObject and return modified by apidoc parsedElement
 * @param {Object} parsedElement apidoc parsed element
 * @param {Object} swaggerPathItemObject current swagger path Item object
 */
module.exports.init = (parsedElement, swaggerPathItemObject) => {
  if (!Array.isArray(swaggerPathItemObject.produces)) {
    swaggerPathItemObject.produces = []
  }
  swaggerPathItemObject.produces.push("application/json")
  if (!Array.isArray(swaggerPathItemObject.consumes)) {
    swaggerPathItemObject.consumes = []
  }
  swaggerPathItemObject.consumes.push("application/json")


  let exampleData;

  try {
    exampleData = JSON.parse(parsedElement.content)
  }
  catch (err) {
    exampleData = parsedElement.content;
  }

    swaggerPathItemObject.responses = {}
    swaggerPathItemObject.responses["200"] = {
      description: `${parsedElement.title} type ${parsedElement.type}`,
      schema: {
        type: "object",
        example: exampleData
      }
    }
  return swaggerPathItemObject
}