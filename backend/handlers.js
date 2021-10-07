"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, DATABASE, SPOONACULAR_APIKEY } = process.env;
const request = require("request-promise");

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { sendResponse, getQueryString, getTotalNutrition } = require("./utils");
const { testData } = require("./testData");

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

const verifyUser = async (req, res, next) => {
  const {
    client,
    db,
    params: { sub },
  } = req;

  try {
    const user = await db.collection("users").find({ _id: sub }).toArray();

    if (user[0]) {
      req.user = user[0];
      console.log(`User found`, user[0]);
      next();
    } else {
      console.log(`User not found`);
      sendResponse({ res: res, status: 404, message: "User not found" });

      client.close();
    }
  } catch (error) {
    console.log(error);
    sendRes({ ...errorObject, res: res });
    client.close();
  }
};

const getUserInfo = async (req, res) => {
  const {
    client,
    db,
    params: { sub },
    user,
  } = req;

  try {
    sendResponse({
      res: res,
      status: 200,
      message: `User found, _id: ${user._id}`,
      data: user,
    });

    client.close();
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
  }
};

const addNewUser = async (req, res) => {
  const {
    client,
    db,
    body: {
      sub,
      given_name,
      email,
      targetDailyCalories,
      proteinPercentage,
      fatPercentage,
      carbsPercentage,
      dietType,
      intolerances,
    },
  } = req;

  // INITIATE NEW USER OBJECT
  const newUserObj = {
    _id: sub,
    email: email,
    family_name: "",
    given_name: given_name,
    mealPlans: [],
    favouriteMeals: [],
    settings: {
      targetDailyCalories: targetDailyCalories,
      dietType: dietType,
      intolerances: intolerances,
      marcroNutrients: {
        proteinPercentage: proteinPercentage,
        fatPercentage: fatPercentage,
        carbsPercentage: carbsPercentage,
      },
    },
  };

  try {
    await db.collection("users").insertOne(newUserObj);

    const newUserCreated = await db
      .collection("users")
      .find({ _id: sub })
      .toArray();

    sendResponse({
      res: res,
      status: 201,
      data: newUserCreated[0],
      message: "New user was created.",
    });

    client.close();
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
  }
};

const updateUser = async (req, res) => {
  const {
    client,
    db,
    body: {
      targetDailyCalories,
      proteinPercentage,
      fatPercentage,
      carbsPercentage,
      dietType,
      intolerances,
    },
    params: { sub },
  } = req;

  try {
    const query = { _id: sub };

    const updateObj = {
      $set: {
        settings: {
          dietType: dietType,
          intolerances: intolerances,
          targetDailyCalories: targetDailyCalories,
          marcroNutrients: {
            proteinPercentage: proteinPercentage,
            fatPercentage: fatPercentage,
            carbsPercentage: carbsPercentage,
          },
        },
      },
    };

    await db.collection("users").update(query, updateObj);

    const updatedUser = await db.collection("users").find(query).toArray();

    sendResponse({
      res: res,
      status: 200,
      message: "Test OKAY!",
      data: updatedUser[0],
    });
    client.close();
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
  }
};

const addFavourite = async (req, res) => {
  const {
    client,
    db,
    body: { id, information, instructions, nutrition, userId },
  } = req;

  const query = { _id: userId };

  const updateObj = {
    $push: {
      favouriteMeals: {
        id: id,
        information: information,
        instructions: instructions,
        nutrition: nutrition,
      },
    },
  };

  try {
    await db.collection("users").updateOne(query, updateObj);

    const user = await db.collection("users").find(query).toArray();

    sendResponse({
      res: res,
      status: 200,
      message: `Recipe id:${id} added to favourite`,
      data: user[0],
    });
    client.close();
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
  }
};

const deleteFavourite = async (req, res) => {
  const {
    client,
    db,
    body: { id, userId },
  } = req;

  const query = { _id: userId };

  const updateObj = {
    $pull: {
      favouriteMeals: {
        id: id,
      },
    },
  };

  try {
    await db.collection("users").updateOne(query, updateObj);

    const user = await db.collection("users").find(query).toArray();

    sendResponse({
      res: res,
      status: 200,
      message: `Remove meal ${id} from favourite successful`,
      data: user[0],
    });
    client.close();
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
  }
};

const getPersonalMealPlan = async (req, res) => {
  const {
    client,
    db,
    params: { userId },
  } = req;

  console.log(userId);

  const query = { _id: userId };

  try {
    const user = await db.collection("users").find(query).toArray();

    sendResponse({
      res: res,
      status: 200,
      message: `Meal plans for user id ${userId} found`,
      data: user[0].mealPlans,
    });

    client.close();
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
  }
};

const addMealPlan = async (req, res) => {
  const {
    client,
    db,
    body: { userId, newPlanName },
  } = req;

  const query = { _id: userId };

  const updateObj = {
    $push: {
      mealPlans: {
        id: uuidv4(),
        name: newPlanName,
        recipes: [],
        totalNutrition: {
          totalCal: 0,
          totalCarbs: 0,
          totalFat: 0,
          totalProtein: 0,
        },
      },
    },
  };

  try {
    await db.collection("users").updateOne(query, updateObj);

    const user = await db.collection("users").find(query).toArray();

    sendResponse({
      res: res,
      status: 200,
      data: user[0],
    });
    client.close();
    console.log(`disconnected!`);

    client.close();
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
  }
};

const addRecipeToMealPlan = async (req, res) => {
  const {
    client,
    db,
    body: { recipeId, information, instructions, nutrition, userId, planId },
  } = req;

  const query = { _id: userId };

  try {
    // CONNECT TO DB AND GET MEAL PLANS
    const user = await db.collection("users").find(query).toArray();
    const { mealPlans } = user[0];

    // INITIATE RECIPE OBJECT
    const recipeObject = {
      id: recipeId,
      information: information,
      instructions: instructions,
      nutrition: nutrition,
    };

    // FIND MEALPLAN WITH PLAN ID AND UPDATE RECIPES ARRAY
    const updatedPlans = mealPlans.map((plan) => {
      if (plan.id === planId) {
        // Update recipes array
        plan = {
          ...plan,
          recipes: [...plan.recipes, recipeObject],
        };

        // Recalculate total meal nutrition
        return (plan = { ...plan, totalNutrition: getTotalNutrition(plan) });
      } else {
        return (plan = { ...plan });
      }
    });

    // UPDATE DB DOCUMENT
    const updateObj = {
      $set: {
        mealPlans: updatedPlans,
      },
    };

    await db.collection("users").updateOne(query, updateObj);

    const updatedUser = await db.collection("users").find(query).toArray();

    sendResponse({
      res: res,
      status: 200,
      message: "Recipe added to meal plan successfully",
      data: updatedUser[0],
    });
    client.close();
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
  }
};

const removeRecipeFromMealPlan = async (req, res) => {
  const {
    client,
    db,
    body: { recipeIndex, recipeId, planId, planIndex, userId },
  } = req;

  try {
    // GET MEAL PLANS
    const query = {
      _id: userId,
    };
    const user = await db.collection("users").find(query).toArray();

    const mealPlans = user[0].mealPlans;

    mealPlans[planIndex].recipes.splice(recipeIndex, 1);

    mealPlans[planIndex].totalNutrition = getTotalNutrition(
      mealPlans[planIndex]
    );

    console.log(`mealPlans[planIndex]`, mealPlans[planIndex]);

    const updateObj = {
      $set: {
        mealPlans: mealPlans,
      },
    };

    await db.collection("users").updateOne(query, updateObj);

    sendResponse({
      res: res,
      status: 200,
      message: `Recipe ${recipeId} removed from meal plan ${planId}`,
      data: user[0],
    });
    client.close();
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
  }
};

const deleteMealPlan = async (req, res) => {
  const {
    client,
    db,
    body: { userId, planIndex, planId },
  } = req;

  try {
    const query = { _id: userId };
    const user = await db.collection("users").find(query).toArray();

    const { mealPlans } = user[0];

    mealPlans.splice(planIndex, 1);

    const updateObj = {
      $set: {
        mealPlans: mealPlans,
      },
    };

    await db.collection("users").updateOne(query, updateObj);

    sendResponse({
      res: res,
      status: 200,
      message: `Meal plan ${planId} deleted successfully`,
      data: user[0],
    });
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res });
    client.close();
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

  const queryString = getQueryString(req.query);

  try {
    await request(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_APIKEY}&instructionsRequired=true&sortDirection=desc&addRecipeInformation=true${queryString}`
    )
      .then((res) => JSON.parse(res))
      .then((data) => {
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
};

const getRecipeInformation = async (req, res) => {
  const { id } = req.params;
  let resData = null;

  try {
    // // GET RECIPE INFO FROM SPOONACULAR
    await request(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${SPOONACULAR_APIKEY}`
    )
      .then((res) => JSON.parse(res))
      .then((data) => {
        resData = { ...resData, information: data };
      });

    // (NO LONGER NEEDED) GET INGREDIENTS FROM SPOONACULAR
    // await request(
    //   `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json/?apiKey=${SPOONACULAR_APIKEY}`
    // )
    //   .then((res) => JSON.parse(res))
    //   .then((data) => {
    //     console.log(data);
    //     resData = { ...resData, ingredients: data.ingredients };
    //   });

    // GET ANALYZED INSTRUCTIONS FROM SPOONACULAR
    await request(
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions/?apiKey=${SPOONACULAR_APIKEY}`
    )
      .then((res) => JSON.parse(res))
      .then((data) => {
        resData = { ...resData, instructions: data[0].steps };
      });

    // GET NUTRITION FROM SPOONACULAR
    await request(
      `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json/?apiKey=${SPOONACULAR_APIKEY}`
    )
      .then((res) => JSON.parse(res))
      .then((data) => {
        resData = { ...resData, nutrition: data };
      });

    // resData = testData;

    sendResponse({
      res: res,
      status: 200,
      data: resData,
      message: "Recipe information found.",
    });
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res, data: error });
  }
};

const getSimilarRecipe = async (req, res) => {
  let resData = null;
  const { favouriteMeals } = req.body;

  const randomFavourite =
    favouriteMeals[Math.floor(Math.random() * favouriteMeals.length)];

  const { id } = randomFavourite;

  try {
    await request(
      `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${SPOONACULAR_APIKEY}&number=5`
    )
      .then((res) => JSON.parse(res))
      .then((data) => {
        resData = data;
      });

    sendResponse({
      res: res,
      status: 200,
      data: resData,
      message: "Get similar recipe successful",
    });
  } catch (error) {
    console.log(error);
    sendResponse({ ...errorObject, res: res, data: error });
  }
};
module.exports = {
  dbConnect,
  getMealPlan,
  getComplexSearch,
  getRecipeInformation,
  getUserInfo,
  verifyUser,
  addNewUser,
  addFavourite,
  deleteFavourite,
  addMealPlan,
  getPersonalMealPlan,
  addRecipeToMealPlan,
  removeRecipeFromMealPlan,
  deleteMealPlan,
  updateUser,
  getSimilarRecipe,
};
