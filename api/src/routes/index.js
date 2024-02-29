const template = require( "./routes-templete" );
const teacherTemplate = require( "./routes-templete/teacher" );
const studentTemplate = require( "./routes-templete/student" );

const routes = app => {
  app.use( ( req, res, next ) => {
    res.setHeader( "Access-Control-Allow-Origin", "*" );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, content-type, x-access-token, authorization"
    );
    res.setHeader( "Access-Control-Allow-Credentials", true );
    res.removeHeader( "X-Powered-By" );
    next();
  } );

  app.use( "/api/", template );
  app.use( "/api/teacher/", teacherTemplate );
  app.use( "/api/student/", studentTemplate );
};

module.exports = routes;