/*
  API Meteo utilisation de fetch
*/
// weather[0]icon VA DONNER 
// main.temp VA DONNER 10.56
// Premier contact avec l'API
/*fetch('https://jsonplaceholder.typicode.com/todos/1'), {method: "GET"}
  .then(response => response.json())
  .then(json => console.log(json))
*/

/* 1.Connection avec l'application via une clef personnelle
home.openweathermap.org/api_keys call API Ange... API Keys*/
const apiKey = "6f0d59dfcb080cd8495827d107606a39";

/* 2.Coordonnées de Liège
Latitude: 50.6333, Longitude: 5.56667 50° 37′ 60″ Nord, 5° 34′ 0″ Est
*/
const latLiege = 50.6333;
const lonLiege = 5.56667;
const lang = "fr";
const counter = 7; // Les données météo de 7 jours

/* Connexion avec l'api via l'url suivante : 
https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=50.6333&lon=5.56667&appid=6f0d59dfcb080cd8495827d107606a39&lang=fr&cnt=7
*/

// 3.API Call
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latLiege}&lon=${lonLiege}&appid=${apiKey}&lang=${lang}&cnt=${counter}`;
console.log(weatherUrl);

// 4.fetch
// fetch(weatherUrl)
//     .then((response) => response.json())
//     .then((response) => {
//     });
/*console.log(response); retourne :
  Object
    city: {id: 2792414, name: 'Liège', coord: {…}, country: 'BE', population: 0, …}
    cnt:  7
    cod:  "200"   
    list: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}  
    message:  0
    [[Prototype]]:  Object  
*/



// --------
/* ----- Exemple avec Weather ------ */
// function fetchingDatas(){}

//function fetchingDatas
function fetchingDatas() {
    return fetch(weatherUrl).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json().then((error) => {
                console.log(error);
                throw new Error("Something went wrong - server-side");
            });
        }

    });
}

// async function ???
async function displayDatas() {
    const calls = (await fetchingDatas()) || [];
    console.log(calls); // va me donner l'objet ► Object et je dois regarder dans la ► list puis dans l'élément ► 0 et là j'aurai le jour la temp etc.

    const callList = calls.list;

    // pour chaque demande à l'API
    callList.forEach((call) => {
        const templateElement = document.importNode(document.querySelector('template').content, true);
       
    /*
       <p id="date">Date</p>
      <img src="" alt="">
      <p id="maxTemp">Max temp</p>
      <p id="minTemp">Min temp</p>
      <p id="winSpeed">Wind Speed</p>
      <p id="description">Description</p>
    </template>
   */
        // Affichage : je vais récupérer les id de mon templateElement
       templateElement.getElementById("maxTemp").textContent = Math.round(call.main.temp_max);
       templateElement.getElementById("winSpeed").textContent = `${Math.round(call.wind.speed*3.6)} km/h`;
        templateElement.getElementById("date").textContent = call.dt_txt;
        // Mettre templateElement en tant qu'enfant de main dans mon HTML
        document.querySelector("main").appendChild(templateElement);
    });

}
// Appel de fonction
displayDatas();