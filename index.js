const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const cors = require("cors")
const bodyParser = require("body-parser")
const routes = require("./router/index")
const auth = require("./router/auth")
const passport = require("passport")
require("dotenv").config()
const app = express()
const database = require("./database/index")

//ports and hostname
const PORT = 3000
const HOSTNAME = "localhost"

const allowedOrigins = [
  "http://localhost:3000",
  "https://mongodb-project-3qz4.onrender.com",
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true, // allow cookies/sessions
  })
)

app.use(bodyParser.json()).use((req, res, next) => {
  next()
})

//set up the express session and database connection
// ✅ Express session with connect-mongo
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // <-- use mongoUrl, not clientPromise
      dbName: "sample_mflix", // optional, if you want a specific DB
      collectionName: "sessions", // optional, defaults to "sessions"
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      maxAge: 1000 * 30, // ⏳ 30 seconds
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

//authentication router
app.use("/", auth)

//create the route to access the routes provided based of what the user is searching for
app.use("/", routes)

//start the application
//run an async function to connect to the database before starting the live server
;(async () => {
  await database.run()

  app.listen(PORT || 3000, () => {
    console.log(`App listening on http://localhost:${PORT}`)
  })
})()
