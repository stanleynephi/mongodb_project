const express = require("express")
const router = express.Router()
const controller = require("../controller/index")
const utilities = require("../utilities/index")
const swaggerui = require("swagger-ui-express")
const swaggerdoc = require("../swagger-output.json")
const { route } = require(".")
/**
 * database connection is done automatically on start up hence no need to call is several times
 * when performing crud on the database
 */

router.use("/api-docs", swaggerui.serve)
router.use(
  "/api-docs",
  swaggerui.setup(swaggerdoc, {
    swaggerOptions: {
      oauth2RedirectUrl:
        process.env.NODE_ENV === "production"
          ? "https://mongodb-project-3qz4.onrender.com/api-docs/oauth2-redirect.html"
          : "http://localhost:3000/api-docs/oauth2-redirect.html",
      oauth: {
        clientId: process.env.AUTH0_CLIENT_ID,
        scopes: ["openid", "profile", "email"],
      },
    },
  })
)

//use the router and the http verbs to work arround the api
//1. get
router.get("/get", utilities.checkloggedIn, controller.getmovies)

// //2. get:id
// router.get("/get/:id", async (req, res) => {
//   res.send("user result based of the provided ID")
// })
//router module to export the data
module.exports = router
