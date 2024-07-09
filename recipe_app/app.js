let search = document.querySelector(".search-btn");
let input = document.querySelector("#input-box");
let recipeContainer = document.querySelector(".recipe-container");
let baseApi = "https://www.themealdb.com/api/json/v1/1/search.php?s";
let heading = document.querySelector(".heading-main");
let recipeInfo = document.querySelector(".recipe-info");

const getRecipe = async (userValue) => {
  try {
    if (userValue === "") {
      heading.innerText = "Write something in search box to get the recipe !";
    } else {
      heading.innerText = "Fetching the Recipes...";
      const response = await fetch(`${baseApi}=${userValue}`);
      const data = await response.json();
      heading.innerText = "";
      recipeContainer.innerHTML = ""; // Clear previous recipes

      if (data.meals) {
        data.meals.forEach((meal) => {
          let div = document.createElement("div");
          div.classList.add("cards");
          recipeContainer.appendChild(div);
          div.innerHTML = `<img class = "recipe-img" src = '${meal.strMealThumb}'/>
                                     <h2>${meal.strMeal}</h2>
                                      <h3>${meal.strArea} Dish </h3>
                                      <h3>Belongs to ${meal.strCategory} Category </h3>`;
          let viewBtn = document.createElement("button");
          viewBtn.classList.add("viewRecipe");
          viewBtn.textContent = "View Recipe";
          div.appendChild(viewBtn);

          viewBtn.addEventListener("click", () => {
            showitems(meal);
          });
        });
        const showitems = (ViewIngred) => {
          let dialogBox = document.createElement("div");
          dialogBox.classList.add("dialogBox");
          dialogBox.innerHTML = `     <i class="fa-solid fa-xmark cross-icon" style="color: #d10000;"></i>
                                      <h1 class = 'dialog-box-h1''>${ViewIngred.strMeal} </h1>
                                      <h1 style = 'padding-left: 1rem'>Ingredients:</h1> `;

          recipeInfo.appendChild(dialogBox);
          let unordered = document.createElement("ul");
          unordered.classList.add("unorderd-list");
          dialogBox.appendChild(unordered);
          for (let i = 1; i <= 20; i++) {
            let ingredient = ViewIngred[`strIngredient${i}`];
            let measure = ViewIngred[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
              let list = document.createElement("li");
              list.innerText = `${measure} ${ingredient}`;
              unordered.appendChild(list);
            }
          }
          dialogBox.innerHTML += `<div> 
                                            <h1 style = 'padding: 1rem 1rem'> Instructions: </h1>
                                            <p  style = 'padding: 0.5rem 1rem'> ${ViewIngred.strInstructions} </p>
                                    
                                    </div>`;

          let cross = dialogBox.querySelector(".cross-icon");
          cross.addEventListener("click", () => {
            dialogBox.style.display = "none";
          });
        };
      } else {
        heading.innerText = "No recipes found for this search term!";
      }
    }
  } catch (error) {
    heading.innerText = `Sorry, couldn't fetch the meal: ${error}`;
  }
};


search.addEventListener("click", (element) => {
  element.preventDefault();
  const userInput = input.value.trim(); // Trim any extra whitespace
  getRecipe(userInput);
});
