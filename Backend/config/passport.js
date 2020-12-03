"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var mysqlConnection = require('./mysqlConnection');
var jwt = require('jwt-simple');

// Setup work and export for the JWT passport strategy
function auth() {
    console.log("Hitting auth")
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: process.env.JWT_SECRET_KEY
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log("Creating token" + JSON.stringify(jwt_payload))
            var sqlQuery = "select email from  users where email = '" + jwt_payload.email + "'";
            mysqlConnection.query(sqlQuery, function (err, result) {
                console.log(result[0])
                if (err) {
                    return callback(err, false);
                }
                if (result) {
                    callback(null, result);
                }
                else {
                    callback(null, false);
                }
            });
            // LoginCredentials.find({ email_id: jwt_payload.username }, (err, results) => {
            //     if (err) {
            //         return callback(err, false);
            //     }
            //     if (results) {
            //         callback(null, results);
            //     }
            //     else {
            //         callback(null, false);
            //     }
            // });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


