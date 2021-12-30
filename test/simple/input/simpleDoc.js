/**
 * @api {get} /company/:company/user/:user/favorites Request User information
 * @apiName GetUserFavorites
 * @apiGroup User
 * @apiDescription This is a really long description that
 *  spans multiple lines. and inclues some random things
 * @apiParam (MyGroup) {Number} company CompanyId of the User
 * @apiParam {Number} user Users unique ID.
 * @apiParam (Query Parameters) {Number} optional Optional query parameter
 * @apiQuery {Boolean} isArchived=false unique ID.
 * @apiSuccess (200) {Object} data
 * @apiSuccessExample {json} Sample Response:
 * HTTP/1.1 200 OK
 * {
 *     "data": {
 *         "id": "1",
 *         "user_id": 1,
 *         "name": "my fave",
 *         "data": "the stringified data",
 *         "team_id": 1,
 *         "order": 0,
 *         "product": "my product"
 *     }
 * }
 */

