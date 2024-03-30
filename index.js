
const containerSearch = document.querySelector(".container_search");
const Btnsearch = document.getElementById("btnsearh");
const contactBnt = document.querySelector(".contact");
let url = "https://restcountries.com/v3.1/all";
let data = [];

function displayCountries(countries) {
    contactBnt.innerHTML = "";
    countries.forEach(item => {
        contactBnt.innerHTML +=
            `
             <div class="contact_box">
                <h1>${item.name.common}</h1>
                <img src="${item.flags.png}" alt="${item.name.common} flag">
             </div>
        `;
    });
}

function fetchCounties() {
    fetch(url)
        .then(res => res.json())
        .then(countries => {
            data = countries;
            displayCountries(data);
        })
        .catch(error => {
            console.log(error);
        });
}

fetchCounties();

containerSearch.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();
    const filtered = data.filter((item) => {
        return item.name.common.toLowerCase().includes(value);
    });
    displayCountries(filtered);
});