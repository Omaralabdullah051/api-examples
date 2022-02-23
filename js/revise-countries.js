const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => displayCountries(data));
}
loadCountries();

const displayCountries = countries => {
    const countriesDiv = document.getElementById('countries');
    countries.forEach(country => {
        const div = document.createElement('div');
        div.classList.add('country');
        div.innerHTML = `
        <h3>${country.name.common}</h3>
        <p>${country.name.official}</p>
        <button onclick="loadCountriesByName('${country.name.common}')">Details</button>
        `;
        countriesDiv.appendChild(div);
    });
}

const loadCountriesByName = name => {
    const url = `https://restcountries.com/v3.1/name/${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountriesDetail(data[0]));
}

const displayCountriesDetail = detail => {
    const countryDetails = document.getElementById('country-details');
    countryDetails.innerHTML = `
    <img width="200px" src="${detail.flags.png}">
    <p>Name: ${detail.name.common}</p>
    <p>Capital: ${detail.capital[0]}</p>
    <p>Population: ${detail.population}</p>
    <p>Region: ${detail.region}</p>
    `;
}