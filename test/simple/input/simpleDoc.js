/**
 * @api {get} /company/:company/user/:user/favorites Request User information
 * @apiName GetUserFavorites
 * @apiGroup User
 *
 * @apiParam {Number} company CompanyId of the User
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */