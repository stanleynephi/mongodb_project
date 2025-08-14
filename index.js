//require the express
const express = require("express")
const routes = require("./router")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const database = require("./database")

//ports and hostname
const PORT = 9000
const HOSTNAME = "localhost"

app.use(cors())

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  next()
})

//create the route to access the routes provided based of what the user is searching for
app.use("/", routes)
//start the application
//run an async function to connect to the database before starting the live server
;(async () => {
  await database.run()

  app.listen(PORT || 9000, () => {
    console.log(`App listening on http://localhost:${PORT}`)
  })
})()
