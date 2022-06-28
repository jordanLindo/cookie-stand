/*
FILE app.js
@date 2022-06-27
*/

"use strict"

// Global variables
var locations;
var hoursOfOp = ['6:00am','7:00am','8:00am','9:00am','10:00am','11:00am','12:00pm'
,'1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm'];
var hourlyTotals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dailyTotals;
var hasRun = false;


/**
 * The start point for js file
 */
function initialize(){
    console.log('In initialize()');
        locations = [];

        let seattle = new Store('Seattle',23,65,6.3);
        
        locations.push(seattle);

        let tokyo = new Store('Tokyo',3,24,1.2);
        
        locations.push(tokyo);

        let dubai = new Store('Dubai',11,38,3.7);
        
        locations.push(dubai);

        let paris = new Store('Paris',20,38,2.3);
        
        locations.push(paris);

        let lima = new Store('Lima',2,16,4.6);
        
        locations.push(lima);

    updateLocationListDisplay();

    updateLocationsSection();

    //buildSecondTable();
    
    
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

Store.prototype.render = function(parent){
    let parentElement = parent;
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerText = this.storeLocation;
    tr.appendChild(th);
    let total = 0;
    for (let j = 0; j < hoursOfOp.length; j++) {
        const element = this.getCookiesSoldByHour();
        let td = document.createElement('td');
        td.innerText = element[j][1]+' cookies';
        tr.appendChild(td);
        total += element[j][1];
        hourlyTotals[j] += element[j][1];
    }
    let totalTd = document.createElement('td');
    totalTd.innerText = total;
    tr.appendChild(totalTd);
    parentElement.appendChild(tr);
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
    return Math.ceil(Math.random()*(max-min)+min);
}

/**
 * Updates a div with a new article.
 */
function updateLocationListDisplay(){
    let div = document.getElementById('locationList');
    if(div != null){
        div.innerHTML = '';
        let article = buildLocationListDisplay();
        div.appendChild(article);
    }
}


function updateLocationsSection(){
    let section = document.getElementById('locationSection');
    if(section != null){
        section.innerHTML = '';
        let list = buildLocationsSectionList();
        section.appendChild(list);
    }
}



/**
 * Assembles an article based on simulates sales information.
 * @returns {article} an article assembled based on simulated sales information
 */
function buildLocationListDisplay(){
    let article = document.createElement('article');
    let h2 = document.createElement('h2');
    h2.innerText = 'Locations';
    article.appendChild(h2);
    let div = document.getElementById('locationList');
    let table = document.createElement('table');
    table.setAttribute('id','salesTable');
    let headerTr = getHeaderRow();

    let totalTh = document.createElement('th');
    totalTh.innerText = "Daily Location Total";
    headerTr.appendChild(totalTh);

    table.appendChild(headerTr);
    locations.forEach(store => {
        store.render(table);
    });

    for (let i = 0; i < locations.length; i++) {
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        th.innerText = locations[i].storeLocation;
        tr.appendChild(th);
        let total = 0;
        for (let j = 0; j < hoursOfOp.length; j++) {
            const element = locations[i].getCookiesSoldByHour();
            let td = document.createElement('td');
            td.innerText = element[j][1]+' cookies';
            tr.appendChild(td);
            total += element[j][1];
            hourlyTotals[j] += element[j][1];
        }
        let totalTd = document.createElement('td');
        totalTd.innerText = total;
        tr.appendChild(totalTd);
        table.appendChild(tr);
    }
    let tFooter = getTableFooter(hourlyTotals);
    
    table.appendChild(tFooter);
    article.appendChild(table);

    return article;
}


function buildSecondTable(){
    let parent = document.getElementById("locationList");
    let originTable = document.getElementById("salesTable");
    let table = document.createElement('table');
    table.appendChild(getHeaderRow());
    locations.forEach(store => {
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        th.innerText = store.storeLocation;
        tr.appendChild(th);
        for (let i = 0; i < hoursOfOp.length; i++) {
            const element = store.getCookiesSoldByHour[i];
            let td = document.createElement('td');
            td.innerText = Math.floor(element/20);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    });
    parent.appendChild(table);
}

function getHeaderRow(){
    let timeTr = document.createElement('thead');
    let emptyTd = document.createElement('td');
    timeTr.appendChild(emptyTd);
    for (let j = 0; j < hoursOfOp.length; j++) {
        let timeTh = document.createElement('th');
        timeTh.innerText = hoursOfOp[j];
        timeTr.appendChild(timeTh);
    }
    return timeTr;
}


function getTableFooter(hourlyTotals){

    let tFooter = document.createElement('tfoot');
    let totalRTh = document.createElement('th');
    totalRTh.innerText = "Totals";
    tFooter.appendChild(totalRTh);
    for (let k = 0; k < hoursOfOp.length; k++) {
        let td = document.createElement('td');
        td.innerText = hourlyTotals[k];
        tFooter.appendChild(td);
    }
    return tFooter;
}

let tr = document.createElement('tr')

/**
 * Builds a section for a location list.
 * @returns {ul} an unordered list of locations
 */
function buildLocationsSectionList(){
    let ul = document.createElement('ul');
    for (let i = 0; i < locations.length; i++) {
        let li = document.createElement('li');
        li.innerText = locations[i].storeLocation;
        ul.appendChild(li);
    }
    return ul
}

initialize();