// const { query } = require("express");

const sendResponse = ({
  res,
  status,
  data,
  message = "No message included.",
}) => {
  return res.status(status).json({ status, data, message });
};

const getMinMax = (targetValueObj) => {
  let result = {};
  const keysArr = Object.keys(targetValueObj);

  // iterate through each nutrition
  keysArr.map((key) => {
    result = {
      ...result,
      [key]: {
        [`min${key}`]: targetValueObj[key] * 1 - 5,
        [`max${key}`]: targetValueObj[key] * 1 + 5,
      },
    };
  });

  return result;
};

const getQueryString = (queryObject) => {
  let result = "";
  const queryArr = Object.entries(queryObject);

  queryArr.forEach((query) => {
    if (query[0] !== `isStrictMode` && query[1] !== 0 && query[1] !== "") {
      result = result.concat("", `&${query[0]}=${query[1]}`);
    }
  });

  return result;
};

const getTotalNutrition = (mealPlan) => {
  const { recipes } = mealPlan;
  let totalCal = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;

  recipes.map((recipe) => {
    const {
      nutrition: { calories, carbs, fat, protein },
    } = recipe;

    // console.log(calories, carbs, fat, protein);

    const caloriesAsNum = calories.replace("k", "") * 1;
    const carbsAsNum = carbs.replace("g", "") * 1;
    const fatAsNum = fat.replace("g", "") * 1;
    const proteinAsNum = protein.replace("g", "") * 1;

    // console.log(`caloriesAsNum`, caloriesAsNum, `type`, typeof caloriesAsNum);
    // console.log(`carbsAsNum`, carbsAsNum, `type`, typeof carbsAsNum);
    // console.log(`fatAsNum`, fatAsNum, `type`, typeof fatAsNum);
    // console.log(`proteinAsNum`, proteinAsNum, `type`, typeof proteinAsNum);

    totalCal += caloriesAsNum;
    totalCarbs += carbsAsNum;
    totalFat += fatAsNum;
    totalProtein += proteinAsNum;
  });

  return {
    totalCal: totalCal,
    totalCarbs: totalCarbs,
    totalFat: totalFat,
    totalProtein: totalProtein,
  };
};

module.exports = { sendResponse, getMinMax, getQueryString, getTotalNutrition };
