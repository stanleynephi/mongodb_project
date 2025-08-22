/**checks to see the user is logged in */
const utilities = {}

utilities.checkloggedIn = (req, res, next) => {
  //check the cookies to see if we have a connect-sid in there to very logged in
  if (req.isAuthenticated && req.isAuthenticated()) {
    //move to the get page
    return next()
  }

  return res.redirect("/login")
}

//export utilities
module.exports = utilities
