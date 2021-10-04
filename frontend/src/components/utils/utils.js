const getMinMax = (targetValueObj) => {
  let result = {};
  const keysArr = Object.keys(targetValueObj);

  // iterate through each nutrition
  keysArr.map((key) => {
    result = {
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

module.exports = {
  getMinMax,
  getQueryString,
  capitalizeFirstLetter,
};
