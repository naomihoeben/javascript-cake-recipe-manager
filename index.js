'use strict';

const cakeRecipes = require("./cake-recipes.json");
var prompt = require('prompt-sync')();

console.log("Welcome to Naomi's Cake Recipe Manager!");

// *** Functionality 1: Show All Authors ***
function getUniqueAuthors(recipes) {
  const uniqueAuthors = [];
  recipes.forEach(recipe => {
    if (!uniqueAuthors.includes(recipe.Author)) {
      uniqueAuthors.push(recipe.Author);
    }
  });
  return uniqueAuthors;
}

// Log the name of each recipe
function logRecipeNames(recipes) {
    if (recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }
  recipes.forEach(({ Name }) => {
    console.log(Name);
  });
}

// *** Functionality 2: Show Recipe names by Author ***
function getRecipesByAuthor(recipes, author) {
  const filteredRecipes = recipes.filter(recipe => recipe.Author.toLowerCase() === author.toLowerCase());
  return filteredRecipes;
}

// *** Functionality 3: Show Recipe names by Ingredient ***
function getRecipesByIngredient(recipes, ingredient) {
  const filteredRecipes = recipes.filter(recipe =>
    recipe.Ingredients.some(ing => ing.includes(ingredient))
  );
  return filteredRecipes;
}

// *** Functionality 4: Get Recipe by Name ***
function getRecipeByName(recipes, name) {
  const recipe = recipes.find(recipe => recipe.Name.toLowerCase().includes(name.toLowerCase()));
  return recipe || null;
}

// *** Functionality 5: Get All Ingredients of Saved Recipes ***
function getAllIngredients(recipes) {
  return recipes.reduce((ingredients, recipe) => {
    return ingredients.concat(recipe.Ingredients);
  }, []);
}

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}

let choice;
let savedRecipes = [];

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log(getUniqueAuthors(cakeRecipes));
      break;

    case 2:
      const authorName = prompt("Please enter the author's name: ");
      const filteredByAuthor = getRecipesByAuthor(cakeRecipes, authorName);
      console.log("All recipes for " + authorName + ": ");
      logRecipeNames(filteredByAuthor);
      break;

    case 3:
      const ingredientName = prompt("Please enter the ingredient: ");
      const filteredByIngredient= getRecipesByIngredient(cakeRecipes, ingredientName);
      logRecipeNames(filteredByIngredient);
      break;

    case 4:
      const recipeName = prompt("Please enter the name of the recipe: ");
      const foundRecipe = getRecipeByName(cakeRecipes, recipeName);
      if (foundRecipe) {
        console.log(foundRecipe);
        while (true) {
          const saveRecipe = prompt("Do you want to save this recipe? yes/no: ").toLowerCase();
          if (saveRecipe === "yes") {
            savedRecipes.push(foundRecipe);
            console.log("Recipe saved!");
            break;
          } else if (saveRecipe === "no") {
            console.log("Recipe not saved.");
            break;
          } else {
            console.log("Please answer only 'yes' or 'no': ");
          }
        }
      } else {
        console.log("No recipe found.");
      }
      break;

    case 5:
      if (savedRecipes.length > 0) {
        const allIngredients = getAllIngredients(savedRecipes);
        console.log("All saved ingredients: ");
        console.log(allIngredients);
      } else {
        console.log("No saved ingredients found.");
      }
      break;

    case 0:
      console.log("Exiting...");
      break;

    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
