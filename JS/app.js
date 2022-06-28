/*
FILE app.js
@date 2022-06-27
*/

"use strict"

// Global variables
var locations;
var hoursOfOp = ['6am','7am','8am','9am','10am','11am','12pm'
,'1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
var hasRun = false;


/**
 * The start point for js file
 */
function initialize(){
    console.log('In initialize()');
    if(!hasRun){
        locations = [];

        let seattle = {
            location: "Seattle",
            minCust: 23,
            maxCust: 65,
            avgCookieSale: 6.3,
            cookiesSoldByHour: []
        };
        seattle.cookiesSoldByHour = getSimCookiesByHour(seattle.maxCust,seattle.minCust,seattle.avgCookieSale);
        locations.push(seattle);

        let tokyo = {
            location: "Tokyo",
            minCust: 3,
            maxCust: 24,
            avgCookieSale: 1.2,
            cookiesSoldByHour: []
        
        };
        tokyo.cookiesSoldByHour = getSimCookiesByHour(tokyo.maxCust,tokyo.minCust,tokyo.avgCookieSale);
        locations.push(tokyo);

        let dubai = {
            location: "Dubai",
            minCust: 11,
            maxCust: 38,
            avgCookieSale: 3.7,
            cookiesSoldByHour: []
        };
        dubai.cookiesSoldByHour = getSimCookiesByHour(dubai.maxCust,dubai.minCust,dubai.avgCookieSale);
        locations.push(dubai);


        let paris = {
            location: "Paris",
            minCust: 20,
            maxCust: 38,
            avgCookieSale: 2.3,
            cookiesSoldByHour: []
        
        };
        paris.cookiesSoldByHour = getSimCookiesByHour(paris.maxCust,paris.minCust,paris.avgCookieSale);
        locations.push(paris);



        let lima = {
            location: "Lima",
            minCust: 2,
            maxCust: 16,
            avgCookieSale: 4.6,
            cookiesSoldByHour: []
        };
        lima.cookiesSoldByHour = getSimCookiesByHour(paris.maxCust,paris.minCust,paris.avgCookieSale);
        locations.push(lima);

        hasRun = true;
    }

    updateLocationListDisplay();
    udpateLocationsSection();
    
    
}

/**
 * 
 * @param {number} maxCust maximum hourly customers
 * @param {number} minCust minimum hourly customers
 * @param {number} avgCookieSale average cookies sold per customer
 * @returns {Array} cookie sales by hour
 */
function getSimCookiesByHour(maxCust,minCust,avgCookieSale){
    let result = [];
    for (let i = 0; i < hoursOfOp.length; i++) {
        let randomCust = random(maxCust,minCust)
        let line = [hoursOfOp[i],Math.floor(randomCust*avgCookieSale)];
        result.push(line);
    }
    return result;
}

/**
 * 
 * @param {number} max maximum number
 * @param {number} min minimum number
 * @returns {number} a random number between min and max inclusive
 */
function random(max,min){
    return Math.floor(Math.random()*(max-min)+min);
}

/**
 * Updates a div with a new article.
 */
function updateLocationListDisplay(){
    let div = document.getElementById("locationList");
    if(div != null){
        div.innerHTML = "";
        let article = buildLocationListDisplay();
        div.appendChild(article);
    }
}


function udpateLocationsSection(){
    let section = document.getElementById("locationSection");
    if(section != null){
        section.innerHTML = "";
        let list = buildLocationsSectionList();
        section.appendChild(list);
    }
}


/**
 * Assembles an article based on simulates sales information.
 * @returns {article} an article assembled based on simulated sales information
 */
function buildLocationListDisplay(){
    let article = document.createElement("article");
    let h2 = document.createElement("h2");
    h2.innerText = "Locations";
    article.appendChild(h2);
    let ul = document.createElement("ul");
    for (let i = 0; i < locations.length; i++) {
        let li = document.createElement("li");
        li.innerText = locations[i]["location"];
        ul.appendChild(li);
        let innerUl = document.createElement("ul");
        innerUl.classList.add("innerList");
        for (let j = 0; j < hoursOfOp.length; j++) {
            const element = locations[i]["cookiesSoldByHour"];
            let innerLi = document.createElement("li");
            innerLi.innerText = element[j][0]+": "+element[j][1]+" cookies";
            innerUl.appendChild(innerLi);
        }
        li.appendChild(innerUl);
    }
    article.appendChild(ul);

    return article;
}

/**
 * Builds a section for a location list.
 * @returns {ul} an unordered list of locations
 */
function buildLocationsSectionList(){
    let ul = document.createElement("ul");
    for (let i = 0; i < locations.length; i++) {
        let li = document.createElement("li");
        li.innerText = locations[i]["location"];
        ul.appendChild(li);
    }
    return ul
}