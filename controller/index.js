/**communicate with the database to handle data retrieval from the database based of the request put in by the router */
const database = require("../database")
const controller = {}

/**get all the data found in this */
controller.getmovies = async function getmovies(req, res) {
  const page = parseInt(req.query.page) || 1
  const limit = 20
  const skip = (page - 1) * limit
  try {
    const db = await database.getDatabase("sample_mflix")
    const collection = db.collection("movies")
    //check the content in the collection
    const count = await collection.countDocuments()
    if (count === 0) {
      console.log("No data found")
      return res.status(404).json({ message: "No data found" })
    }
    //convert the collection result to an array
    const data = await collection.find({}).skip(skip).limit(limit).toArray()
    console.log(data)
    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

module.exports = controller
