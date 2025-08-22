const express = require("express")
const router = express.Router()
const controller = require("../controller/index")
const utilities = require("../utilities/index")
/**
 * database connection is done automatically on start up hence no need to call is several times
 * when performing crud on the database
 */

//use the router and the http verbs to work arround the api
//1. get
router.get("/get", utilities.checkloggedIn, controller.getmovies)

// //2. get:id
// router.get("/get/:id", async (req, res) => {
//   res.send("user result based of the provided ID")
// })
//router module to export the data
module.exports = router
