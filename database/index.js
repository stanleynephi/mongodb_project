//required modules and files need
require("dotenv").config()

//variables for database connection
const uri = process.env.MONGODB_URI

//create a connection to the database
const { MongoClient, ServerApiVersion } = require("mongodb")

//database variable
let database

//create the mongodb client needed
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

//create a run function to be exported
const run = async function () {
  //try catch to handle errors.
  try {
    database = await client.connect()
    console.log("connected")
    return database
  } catch (errors) {
    //catch and send back errors
    console.log(errors)
  }
}

//function to get collection
async function getDatabase() {
  //get the database collection needed
  try {
    if (database) {
      console.log("database is still open")
      const db = client.db("sample_mflix")

      if (!db) {
        console.log("database not found")
      }

      return db
    } else {
      console.log("database connection not found")
    }
  } catch (errors) {
    console.log(errors)
  }
}

module.exports = { run, getDatabase }
