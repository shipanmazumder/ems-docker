const express = require( 'express' );
const { isAuth } = require('../../middlewares/AuthCheck');
const { teacher} = require('../../util/ValidationUtill');
const { login,create} = require('../../controllers/TeacherController');

let route = express.Router();

route.all( '/', ( req, res ) => {
  res.send( { message : 'Hello from Express!' } );
} );
module.exports = route;