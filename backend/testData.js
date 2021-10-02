const testData = {
  information: {
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    weightWatcherSmartPoints: 13,
    gaps: "no",
    lowFodmap: false,
    preparationMinutes: 6,
    cookingMinutes: 4,
    aggregateLikes: 7,
    spoonacularScore: 87,
    healthScore: 31,
    creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    license: "CC BY 3.0",
    sourceName: "Foodista",
    pricePerServing: 188.99,
    extendedIngredients: [
      {
        id: 8121,
        aisle: "Cereal",
        image: "rolled-oats.jpg",
        consistency: "solid",
        name: "old-fashioned oatmeal",
        nameClean: "cooked rolled oats",
        original:
          "1/2 cup old-fashioned oatmeal (may use steel cut but not the instant kind)",
        originalString:
          "1/2 cup old-fashioned oatmeal (may use steel cut but not the instant kind)",
        originalName:
          "old-fashioned oatmeal (may use steel cut but not the instant kind)",
        amount: 0.5,
        unit: "cup",
        meta: ["instant", "(may use steel cut but not the kind)"],
        metaInformation: ["instant", "(may use steel cut but not the kind)"],
        measures: {
          us: {
            amount: 0.5,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 118.294,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 1001119,
        aisle: "Milk, Eggs, Other Dairy",
        image: "vanilla-yogurt.png",
        consistency: "liquid",
        name: "vanilla yogurt",
        nameClean: "low fat vanilla yogurt",
        original:
          "6 oz low-fat vanilla yogurt (if using plain yogurt, add honey for sweetness)",
        originalString:
          "6 oz low-fat vanilla yogurt (if using plain yogurt, add honey for sweetness)",
        originalName:
          "low-fat vanilla yogurt (if using plain yogurt, add honey for sweetness)",
        amount: 6,
        unit: "oz",
        meta: [
          "plain",
          "low-fat",
          "for sweetness",
          "(if using yogurt, add honey )",
        ],
        metaInformation: [
          "plain",
          "low-fat",
          "for sweetness",
          "(if using yogurt, add honey )",
        ],
        measures: {
          us: {
            amount: 6,
            unitShort: "oz",
            unitLong: "ounces",
          },
          metric: {
            amount: 170.097,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
      {
        id: 1077,
        aisle: "Milk, Eggs, Other Dairy",
        image: "milk.png",
        consistency: "liquid",
        name: "milk",
        nameClean: "milk",
        original: "1/3 cup milk",
        originalString: "1/3 cup milk",
        originalName: "milk",
        amount: 0.3333333333333333,
        unit: "cup",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 0.333,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 78.863,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 9003,
        aisle: "Produce",
        image: "apple.jpg",
        consistency: "solid",
        name: "apple",
        nameClean: "apple",
        original: "1 small apple, chopped",
        originalString: "1 small apple, chopped",
        originalName: "apple, chopped",
        amount: 1,
        unit: "small",
        meta: ["chopped"],
        metaInformation: ["chopped"],
        measures: {
          us: {
            amount: 1,
            unitShort: "small",
            unitLong: "small",
          },
          metric: {
            amount: 1,
            unitShort: "small",
            unitLong: "small",
          },
        },
      },
      {
        id: 9040,
        aisle: "Produce",
        image: "bananas.jpg",
        consistency: "solid",
        name: "banana",
        nameClean: "ripe banana",
        original: "1 small banana, chopped",
        originalString: "1 small banana, chopped",
        originalName: "banana, chopped",
        amount: 1,
        unit: "small",
        meta: ["chopped"],
        metaInformation: ["chopped"],
        measures: {
          us: {
            amount: 1,
            unitShort: "small",
            unitLong: "small",
          },
          metric: {
            amount: 1,
            unitShort: "small",
            unitLong: "small",
          },
        },
      },
      {
        id: 9078,
        aisle: "Produce",
        image: "cranberries.jpg",
        consistency: "solid",
        name: "cranberry",
        nameClean: "cranberries",
        original: "2-3 tablespoon dried cranberry or raisins",
        originalString: "2-3 tablespoon dried cranberry or raisins",
        originalName: "dried cranberry or raisins",
        amount: 2,
        unit: "tablespoon",
        meta: ["dried"],
        metaInformation: ["dried"],
        measures: {
          us: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
          metric: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
        },
      },
      {
        id: 12155,
        aisle: "Nuts;Baking",
        image: "walnuts.jpg",
        consistency: "solid",
        name: "walnuts",
        nameClean: "walnuts",
        original: "1 tablespoon walnuts",
        originalString: "1 tablespoon walnuts",
        originalName: "walnuts",
        amount: 1,
        unit: "tablespoon",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
          metric: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
        },
      },
    ],
    id: 638604,
    title: "Chilled Swiss Oatmeal",
    readyInMinutes: 10,
    servings: 1,
    sourceUrl: "https://www.foodista.com/recipe/K232GXCT/chilled-swiss-oatmeal",
    image: "https://spoonacular.com/recipeImages/638604-556x370.jpg",
    imageType: "jpg",
    summary:
      'Chilled Swiss Oatmeal might be a good recipe to expand your breakfast repertoire. One serving contains <b>524 calories</b>, <b>17g of protein</b>, and <b>14g of fat</b>. This recipe serves 1. For <b>$1.89 per serving</b>, this recipe <b>covers 24%</b> of your daily requirements of vitamins and minerals. 7 people have tried and liked this recipe. This recipe from Foodista requires cranberry juice, vanilla yogurt, banana, and apple. From preparation to the plate, this recipe takes around <b>10 minutes</b>. It is a good option if you\'re following a <b>gluten free and lacto ovo vegetarian</b> diet. Overall, this recipe earns a <b>solid spoonacular score of 80%</b>. Try <a href="https://spoonacular.com/recipes/chilled-swiss-oatmeal-1371821">Chilled Swiss Oatmeal</a>, <a href="https://spoonacular.com/recipes/quick-healthy-breakfast-chilled-swiss-oatmeal-1229091">Quick & Healthy Breakfast – Chilled Swiss Oatmeal</a>, and <a href="https://spoonacular.com/recipes/quick-healthy-breakfast-chilled-swiss-oatmeal-1444707">Quick & Healthy Breakfast – Chilled Swiss Oatmeal</a> for similar recipes.',
    cuisines: [],
    dishTypes: ["morning meal", "brunch", "breakfast"],
    diets: ["gluten free", "lacto ovo vegetarian"],
    occasions: [],
    winePairing: {
      pairedWines: [],
      pairingText: "",
      productMatches: [],
    },
    instructions:
      "<p>-In a small bowl, add oatmeal, yogurt, milk and combine. Let it sit for few minutes or several hours in the refrigerator.  Then add apples, banana, dried fruits and stir until well combined. Top with nuts before serving.</p><p>Note: it tastes best when allowed to sit overnight. Add fruits right before serving to prevent browning and being mushy.</p>",
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step: "-In a small bowl, add oatmeal, yogurt, milk and combine.",
            ingredients: [
              {
                id: 8121,
                name: "oatmeal",
                localizedName: "oatmeal",
                image: "rolled-oats.jpg",
              },
              {
                id: 1116,
                name: "yogurt",
                localizedName: "yogurt",
                image: "plain-yogurt.jpg",
              },
              {
                id: 1077,
                name: "milk",
                localizedName: "milk",
                image: "milk.png",
              },
            ],
            equipment: [
              {
                id: 404783,
                name: "bowl",
                localizedName: "bowl",
                image: "bowl.jpg",
              },
            ],
          },
          {
            number: 2,
            step: "Let it sit for few minutes or several hours in the refrigerator.  Then add apples, banana, dried fruits and stir until well combined. Top with nuts before serving.Note: it tastes best when allowed to sit overnight.",
            ingredients: [
              {
                id: 9003,
                name: "apple",
                localizedName: "apple",
                image: "apple.jpg",
              },
              {
                id: 9040,
                name: "banana",
                localizedName: "banana",
                image: "bananas.jpg",
              },
              {
                id: 9431,
                name: "fruit",
                localizedName: "fruit",
                image: "mixed-fresh-fruit.jpg",
              },
              {
                id: 12135,
                name: "nuts",
                localizedName: "nuts",
                image: "nuts-mixed.jpg",
              },
            ],
            equipment: [],
          },
          {
            number: 3,
            step: "Add fruits right before serving to prevent browning and being mushy.",
            ingredients: [
              {
                id: 9431,
                name: "fruit",
                localizedName: "fruit",
                image: "mixed-fresh-fruit.jpg",
              },
            ],
            equipment: [],
          },
        ],
      },
    ],
    originalId: null,
    spoonacularSourceUrl:
      "https://spoonacular.com/chilled-swiss-oatmeal-638604",
  },
  ingredients: [
    {
      name: "old-fashioned oatmeal",
      image: "rolled-oats.jpg",
      amount: {
        metric: {
          value: 117,
          unit: "g",
        },
        us: {
          value: 0.5,
          unit: "cup",
        },
      },
    },
    {
      name: "low fat plain vanilla yogurt",
      image: "vanilla-yogurt.png",
      amount: {
        metric: {
          value: 170.097,
          unit: "g",
        },
        us: {
          value: 6,
          unit: "oz",
        },
      },
    },
    {
      name: "milk",
      image: "milk.png",
      amount: {
        metric: {
          value: 81.333,
          unit: "ml",
        },
        us: {
          value: 0.3333333333333333,
          unit: "cup",
        },
      },
    },
    {
      name: "apple",
      image: "apple.jpg",
      amount: {
        metric: {
          value: 1,
          unit: "small",
        },
        us: {
          value: 1,
          unit: "small",
        },
      },
    },
    {
      name: "banana",
      image: "bananas.jpg",
      amount: {
        metric: {
          value: 1,
          unit: "small",
        },
        us: {
          value: 1,
          unit: "small",
        },
      },
    },
    {
      name: "dried cranberry",
      image: "cranberries.jpg",
      amount: {
        metric: {
          value: 2,
          unit: "Tbsps",
        },
        us: {
          value: 2,
          unit: "Tbsps",
        },
      },
    },
    {
      name: "walnuts",
      image: "walnuts.jpg",
      amount: {
        metric: {
          value: 1,
          unit: "Tbsp",
        },
        us: {
          value: 1,
          unit: "Tbsp",
        },
      },
    },
  ],
  instructions: [
    {
      number: 1,
      step: "-In a small bowl, add oatmeal, yogurt, milk and combine.",
      ingredients: [
        {
          id: 8121,
          name: "oatmeal",
          localizedName: "oatmeal",
          image: "rolled-oats.jpg",
        },
        {
          id: 1116,
          name: "yogurt",
          localizedName: "yogurt",
          image: "plain-yogurt.jpg",
        },
        {
          id: 1077,
          name: "milk",
          localizedName: "milk",
          image: "milk.png",
        },
      ],
      equipment: [
        {
          id: 404783,
          name: "bowl",
          localizedName: "bowl",
          image: "bowl.jpg",
        },
      ],
    },
    {
      number: 2,
      step: "Let it sit for few minutes or several hours in the refrigerator.  Then add apples, banana, dried fruits and stir until well combined. Top with nuts before serving.Note: it tastes best when allowed to sit overnight.",
      ingredients: [
        {
          id: 9003,
          name: "apple",
          localizedName: "apple",
          image: "apple.jpg",
        },
        {
          id: 9040,
          name: "banana",
          localizedName: "banana",
          image: "bananas.jpg",
        },
        {
          id: 9431,
          name: "fruit",
          localizedName: "fruit",
          image: "mixed-fresh-fruit.jpg",
        },
        {
          id: 12135,
          name: "nuts",
          localizedName: "nuts",
          image: "nuts-mixed.jpg",
        },
      ],
      equipment: [],
    },
    {
      number: 3,
      step: "Add fruits right before serving to prevent browning and being mushy.",
      ingredients: [
        {
          id: 9431,
          name: "fruit",
          localizedName: "fruit",
          image: "mixed-fresh-fruit.jpg",
        },
      ],
      equipment: [],
    },
  ],
  nutrition: {
    calories: "523k",
    carbs: "90g",
    fat: "13g",
    protein: "17g",
    bad: [
      {
        title: "Calories",
        amount: "523k",
        indented: false,
        percentOfDailyNeeds: 26.18,
      },
      {
        title: "Fat",
        amount: "13g",
        indented: false,
        percentOfDailyNeeds: 21.07,
      },
      {
        title: "Saturated Fat",
        amount: "4g",
        indented: true,
        percentOfDailyNeeds: 25.13,
      },
      {
        title: "Carbohydrates",
        amount: "90g",
        indented: false,
        percentOfDailyNeeds: 30.01,
      },
      {
        title: "Sugar",
        amount: "57g",
        indented: true,
        percentOfDailyNeeds: 63.54,
      },
      {
        title: "Cholesterol",
        amount: "16mg",
        indented: false,
        percentOfDailyNeeds: 5.55,
      },
      {
        title: "Sodium",
        amount: "155mg",
        indented: false,
        percentOfDailyNeeds: 6.75,
      },
    ],
    good: [
      {
        title: "Protein",
        amount: "17g",
        indented: false,
        percentOfDailyNeeds: 34.09,
      },
      {
        title: "Manganese",
        amount: "1mg",
        indented: false,
        percentOfDailyNeeds: 73.07,
      },
      {
        title: "Phosphorus",
        amount: "465mg",
        indented: false,
        percentOfDailyNeeds: 46.51,
      },
      {
        title: "Calcium",
        amount: "419mg",
        indented: false,
        percentOfDailyNeeds: 41.95,
      },
      {
        title: "Fiber",
        amount: "10g",
        indented: false,
        percentOfDailyNeeds: 40.89,
      },
      {
        title: "Vitamin B2",
        amount: "0.63mg",
        indented: false,
        percentOfDailyNeeds: 37.14,
      },
      {
        title: "Potassium",
        amount: "1152mg",
        indented: false,
        percentOfDailyNeeds: 32.91,
      },
      {
        title: "Vitamin B6",
        amount: "0.61mg",
        indented: false,
        percentOfDailyNeeds: 30.7,
      },
      {
        title: "Magnesium",
        amount: "119mg",
        indented: false,
        percentOfDailyNeeds: 29.81,
      },
      {
        title: "Selenium",
        amount: "19µg",
        indented: false,
        percentOfDailyNeeds: 27.42,
      },
      {
        title: "Vitamin C",
        amount: "21mg",
        indented: false,
        percentOfDailyNeeds: 25.53,
      },
      {
        title: "Zinc",
        amount: "3mg",
        indented: false,
        percentOfDailyNeeds: 22.88,
      },
      {
        title: "Vitamin B5",
        amount: "2mg",
        indented: false,
        percentOfDailyNeeds: 21.79,
      },
      {
        title: "Copper",
        amount: "0.42mg",
        indented: false,
        percentOfDailyNeeds: 21.23,
      },
      {
        title: "Vitamin B12",
        amount: "1µg",
        indented: false,
        percentOfDailyNeeds: 21.13,
      },
      {
        title: "Vitamin B1",
        amount: "0.29mg",
        indented: false,
        percentOfDailyNeeds: 19.47,
      },
      {
        title: "Folate",
        amount: "64µg",
        indented: false,
        percentOfDailyNeeds: 16.14,
      },
      {
        title: "Iron",
        amount: "2mg",
        indented: false,
        percentOfDailyNeeds: 11.13,
      },
      {
        title: "Vitamin A",
        amount: "369IU",
        indented: false,
        percentOfDailyNeeds: 7.39,
      },
      {
        title: "Vitamin B3",
        amount: "1mg",
        indented: false,
        percentOfDailyNeeds: 7.34,
      },
      {
        title: "Vitamin D",
        amount: "1µg",
        indented: false,
        percentOfDailyNeeds: 7.05,
      },
      {
        title: "Vitamin E",
        amount: "0.98mg",
        indented: false,
        percentOfDailyNeeds: 6.52,
      },
      {
        title: "Vitamin K",
        amount: "6µg",
        indented: false,
        percentOfDailyNeeds: 6.03,
      },
    ],
    expires: 1621293441763,
    isStale: true,
  },
};

module.exports = { testData };
