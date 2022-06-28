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
        locations = [];

        let seattle = new Store("Seattle",23,65,6.3);
        
        locations.push(seattle);

        let tokyo = new Store("Tokyo",3,24,1.2);
        
        locations.push(tokyo);

        let dubai = new Store("Dubai",11,38,3.7);
        
        locations.push(dubai);

        let paris = new Store("Paris",20,38,2.3);
        
        locations.push(paris);

        let lima = new Store("Lima",2,16,4.6);
        
        locations.push(lima);

    updateLocationListDisplay();
    updateLocationsSection();
    
    
}


function Store(storeLocation,minCust,maxCust,avgCookieSale){
    this.storeLocation = storeLocation;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookieSale = avgCookieSale;
}

Store.prototype.getCookiesSoldByHour = function(){
    let result = [];
    for (let i = 0; i < hoursOfOp.length; i++) {
        let randomCust = random(this.maxCust,this.minCust)
        let line = [hoursOfOp[i],Math.floor(randomCust*this.avgCookieSale)];
        result.push(line);
    }
    return result;
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


function updateLocationsSection(){
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
        li.innerText = locations[i].storeLocation;
        ul.appendChild(li);
        let innerUl = document.createElement("ul");
        innerUl.classList.add("innerList");
        let total = 0;
        for (let j = 0; j < hoursOfOp.length; j++) {
            const element = locations[i].getCookiesSoldByHour();
            let innerLi = document.createElement("li");
            innerLi.innerText = element[j][0]+": "+element[j][1]+" cookies";
            innerUl.appendChild(innerLi);
            total += element[j][1];
        }
        let totalLi = document.createElement("li");
        totalLi.innerText = "Total: "+ total;
        innerUl.appendChild(totalLi);
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
        li.innerText = locations[i].storeLocation;
        ul.appendChild(li);
    }
    return ul
}