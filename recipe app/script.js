

const userInput = document.getElementById("user-inp");
const resultText = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
function generatorIngredient(item) {
    const ul = document.createElement('ul');
    for (let i = 1; i <= 20; i++) {
        const ingredient = item['strIngredient' + i];
        const measure = item['strMeasure' + i];
        if (ingredient && ingredient.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = `${ingredient} - ${measure}`;
            ul.appendChild(li);
        }
    }
    return ul;
}


function searchFlex(searchTerm) {
    fetch(`${url}${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            resultText.innerHTML = "";
            if (data.meals) {
                data.meals.forEach(item => {
                    resultText.innerHTML +=
                        `
                    <div class="meal">
                        <img src="${item.strMealThumb}" alt="${item.strMeal}">
                        <div class="details">
                            <h2>${item.strCategory}</h2>
                            <h4>${item.strArea}</h4>
                        </div>
                        <div id="ingredient-con">
                            <ul id='ingredient-list'>
                                ${generatorIngredient(item).innerHTML}
                            </ul>
                        </div>
                        <div id="recipe">
                            <button class="hide-recipe">X</button>
                            <pre class="instructions">${item.strInstructions}</pre>
                        </div>
                        <button class="show-recipe">View Recipe</button>
                    </div>
                    `;
                });
                const showRecipe = document.querySelector(".show-recipe");
                const recibe = document.getElementById("recipe");
                const hideRecipe = document.querySelector(".hide-recipe");
                showRecipe .addEventListener("click",()=>{
                   recibe.style.display = "block"
                   
                })
                hideRecipe.addEventListener("click",()=>{
                    recibe.style.display = "none"
                })
            } else {
                resultText.innerHTML = "Yemek tapilmadi";
            }
        })
        .catch(error => {
            console.error(error);
        });
}

searchBtn.addEventListener("click", () => {
    const searchTerm = userInput.value.trim().toLowerCase();
    if (searchTerm !== "") { 
        searchFlex(searchTerm);
    } 
});

