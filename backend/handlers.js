"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, DATABASE, SPOONACULAR_APIKEY } = process.env;
const request = require("request-promise");

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { sendResponse, getQueryString } = require("./utils");

const options = { useNewUrlParser: true, useUnifiedTopology: true };

// initiate standard error response object
const errorObject = {
  res: null,
  status: 400,
  data: null,
  message: "We met an error, he's not very friendly.",
};

// *** LOCALHOST API HANDLERS ***
const dbConnect = async (req, res, next) => {
  try {
    // connect to MongoDB
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DATABASE);
    console.log(`connected!`);

    // store db and client obj in req
    req.db = db;
    req.client = client;

    next();
    return;
  } catch (error) {
    console.log(error);
    sendResponse({
      res: res,
      status: `400`,
      data: error,
      message: "Something smells funny.",
    });
    client.close();
    console.log(`disconnected!`);
  }
};

// *** SPOONACULAR API HANDLERS ***
const getMealPlan = async (req, res) => {
  let resData = null;
  const { timeFrame, targetCalories, diet, exclude } = req.query;

  try {
    await request(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${SPOONACULAR_APIKEY}&timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}`
    )
      .then((res) => JSON.parse(res))
      .then((data) => {
        console.log(data);
        resData = data;
      });

    sendResponse({
      res: res,
      status: 200,
      data: resData,
      message: "Get quick meal plan successful",
    });
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res, data: error });
  }
};

const getComplexSearch = async (req, res) => {
  let resData = null;
  const {
    cuisine,
    diet,
    intolerances,
    excludeIngredients,
    type,
    sort,
    minCarb,
    maxCarb,
    minProtein,
    maxProtein,
    minFat,
    maxFat,
    minCalories,
    maxCalories,
    isStrictMode,
  } = req.query;

  const queryString = getQueryString(req.query);

  console.log(`queryString`, queryString);

  try {
    await request(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_APIKEY}&instructionsRequired=true&sortDirection=desc&addRecipeInformation=true${queryString}`
    )
      .then((res) => JSON.parse(res))
      .then((data) => {
        console.log(data);
        resData = data;
      });

    sendResponse({
      res: res,
      status: 200,
      data: { ...resData, meals: resData.results },
      message: "Test Successful",
    });
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res, data: error });
  }
  // sendResponse({
  //   res: res,
  //   status: 200,
  // });
};

module.exports = {
  getMealPlan,
  dbConnect,
  getComplexSearch,
};
