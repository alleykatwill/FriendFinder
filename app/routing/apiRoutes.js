// The apiRoutes.js file includes two basic routes for app.get function and app.post function which used for displaying a JASON data and incoming survey results of all possible roommate:

var roommate = require("../data/roommate.js");

// Routing the apiRoutes with the app.get and app.post functions
module.exports = function(app) {
  // The app.get request handles when user 'visits' a page
  app.get("/api/roommate", function(req, res) {
    res.json(roommate);
  });
  // The app.post request handles when a user submits a form and thus submits data to the surver
  app.post("/api/roommate", function(req, res) {
    // loop through all of the possible options
    var bestMatch = {
      name: "",
      photo: "",
      roommateDifference: 1000
    };

    // Result of the user's survey POST and parse it
    var userData = req.body;
    var userScores = userData.scores;
    // Eesults of the user's name and photo, other than the survey questions, to post and parse it
    var userName = userData.name;
    var userPhoto = userData.photo;

    // calculate the difference between scores
    var totalDifference = 0;

    //loop through the roommate data array of objects to get each roommate scores
    for (var i = 0; i < roommate.length - 1; i++) {
      console.log(roommate[i].name);
      totalDifference = 0;

      //loop through that roommate score and the users score and calculate the absolute difference between the two and push that to the total difference variable set above
      for (var j = 0; j < 10; j++) {
        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(
          parseInt(userScores[j]) - parseInt(roommate[i].scores[j])
        );
        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.roommateDifference) {
          // Reset the bestMatch to be the new friend.
          bestMatch.name = roommate[i].name;
          bestMatch.photo = roommate[i].photo;
          bestMatch.roommateDifference = totalDifference;
        }
      }
    }

    // The push method use to save user's data to the database
    roommate.push(userData);

    //The res.json method will return a JSON data with the user's match which was looped through roommate data array.
    res.json(bestMatch);
  });
};
