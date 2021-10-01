"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const { PORT } = process.env;

// import handlers
const { getMealPlan, getComplexSearch, getRecipeInformation } = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // global middleware to connect to db
  // .use(dbConnect)

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  //

  // Spoonacular API calls
  .get("/mealPlan", getMealPlan)
  .get("/complexSearch", getComplexSearch)
  .get("/recipe/:id", getRecipeInformation)

  //
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
