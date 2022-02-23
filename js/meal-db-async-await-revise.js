document.getElementById('danger').style.display = 'none';


const loadFoods = async () => {
    const input = document.getElementById('input-field');
    const inputText = input.value;
    input.value = '';
    document.getElementById('danger').style.display = 'none';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;

    if (inputText == '') {
        document.getElementById('danger').style.display = 'block';
    }
    else {
        try {
            const res = await fetch(url);
            const data = await res.json();
            displayMeal(data.meals);
        }
        catch (error) {
            displayError(error);
        }
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displayMeal(data.meals))
        //     .catch(error => displayError(error))
    }
}

const displayError = error => {
    document.getElementById('danger').style.display = 'block';
}

const displayMeal = meals => {
    const container = document.getElementById('cards');
    container.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadById(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
    </div>
        `;
        container.appendChild(div);
    })
}

const loadById = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDescription(data.meals[0]);
    }
    catch (error) {
        displayError(error);
    }
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDescription(data.meals[0]))
    //     .catch(error => displayError(error))
}

const displayMealDescription = meal => {
    console.log(meal.strMeal);
    const container = document.getElementById('descriptions');
    container.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">view</a>
    </div>
    `;
    container.appendChild(div);

}