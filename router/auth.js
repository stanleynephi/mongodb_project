/**express required library to handle routing */
const router = require("express").Router()
const qs = require("querystring")
/**handles the routing and OAuth */
const passport = require("passport")
const OpenIDConnectStrategy = require("passport-openidconnect")
const { route } = require(".")

//set up the strategies to use the application
passport.use(
  new OpenIDConnectStrategy(
    {
      issuer: "https://" + process.env["AUTH0_DOMAIN"] + "/",
      authorizationURL: "https://" + process.env["AUTH0_DOMAIN"] + "/authorize",
      tokenURL: "https://" + process.env["AUTH0_DOMAIN"] + "/oauth/token",
      userInfoURL: "https://" + process.env["AUTH0_DOMAIN"] + "/userinfo",
      clientID: process.env["AUTH0_CLIENT_ID"],
      clientSecret: process.env["AUTH0_CLIENT_SECRET"],
      callbackURL: "/oauth2/redirect",
      scope: ["profile"],
    },
    function verify(issuer, profile, cb) {
      return cb(null, profile)
    }
  )
)

//serialize the user into the session
passport.serializeUser(function (user, cb) {
  console.log(user)
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.displayName })
  })
})

//deserialize the user
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})

//router to handle the login route
router.get("/login", passport.authenticate("openidconnect"))

router.get(
  "/oauth2/redirect",
  passport.authenticate("openidconnect", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/get")
  }
)

//logout router handling
router.get("/logout", function (req, res, next) {
  req.logOut(function (error) {
    if (error) {
      return next(error)
    }

    //destroy the session
    req.session.destroy((error) => {
      if (error) {
        console.log("Failed to destroy session", error)
      }

      //clear the cookie
      res.clearCookie("connect.sid")

      //redirect page parameters
      let params = {
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: "http://localhost:3000/",
      }

      //redirect page

      res.redirect(
        "https://" +
          process.env.AUTH0_DOMAIN +
          "/v2/logout?" +
          qs.stringify(params)
      )
    })
  })
})

module.exports = router
