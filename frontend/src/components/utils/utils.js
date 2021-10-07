const getMinMax = (targetValueObj) => {
  let result = {};
  const keysArr = Object.keys(targetValueObj);

  // iterate through each nutrition
  keysArr.map((key) => {
    return result = {
      ...result,
      [key]: {
        [`min${key}`]: Math.round(targetValueObj[key] * 0.9),
        [`max${key}`]: Math.round(targetValueObj[key] * 1.1),
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

const capitalizeFirstLetter = (string) => {
  return string.toUpperCase().split("")[0] + string.substring(1);
};

const getShoppingList = (recipes) => {
  let resultObj = {};
  const ingredientsArr = recipes.map((recipe) => {
    return recipe.information.extendedIngredients;
  });

  ingredientsArr.forEach((ingredientList) => {
    ingredientList.forEach((ingredient) => {
      const {
        id,
        image,
        measures: {
          metric: { amount, unitShort },
        },
        originalName,
      } = ingredient;

      if (!resultObj[ingredient.id]) {
        return (resultObj = {
          ...resultObj,
          [ingredient.id]: {
            id: id,
            image: image,
            measures: {
              metric: { amount: +amount, unitShort: unitShort },
            },
            originalName: originalName,
          },
        });
      } else {
        return (resultObj = {
          ...resultObj,
          [ingredient.id]: {
            id: id,
            image: image,
            measures: {
              metric: {
                amount:
                  resultObj[ingredient.id].measures.metric.amount + amount,
                unitShort: unitShort,
              },
            },
            unitShort: unitShort,
            originalName: originalName,
          },
        });
      }
    });
  });

  return Object.values(resultObj);
};

module.exports = {
  getMinMax,
  getQueryString,
  capitalizeFirstLetter,
  getShoppingList,
};
