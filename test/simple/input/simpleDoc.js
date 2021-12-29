/**
 * @api {get} /company/:company/user/:user/favorites Request User information
 * @apiName GetUserFavorites
 * @apiGroup User
 * @apiDescription This is a really long description that
 *  spans multiple lines. and inclues some random things
 * @apiParam (MyGroup) {Number} company CompanyId of the User
 * @apiParam {Number} user Users unique ID.
 * @apiParam (Query Parameters) {Number} optional Optional query parameter
 * @apiQuery {Boolean} isArchived=false  unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
