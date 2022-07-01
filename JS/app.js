/*
FILE app.js
@date 2022-06-27
*/

"use strict"

// Global variables
var storeCollection;
var phoneNumberRE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;


function StoreCollection(){
    this.locations = [];
    this.hoursOfOp = ['6:00am','7:00am','8:00am','9:00am','10:00am','11:00am','12:00pm'
    ,'1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm','8:00pm'];
    this.hourlyTotals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.curve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
}

StoreCollection.prototype.UpdateLocationMember = function(storeLocation,minCustomer,maxCustomer,avgCookieSale,address,phoneNumber){
    let storeToUpdate = this.locations.find(Store =>{
        return Store.storeLocation == storeLocation;
    })
    storeToUpdate.minCustomer = minCustomer;
    storeToUpdate.maxCustomer = maxCustomer;
    storeToUpdate.avgCookieSale = avgCookieSale;
    if(address != ""){
        storeToUpdate.address = address;
    }
    if(phoneNumber != ""){
        storeToUpdate.phoneNumber = phoneNumber;
    }
    storeToUpdate.cookiesByHour = storeToUpdate.getCookiesSoldByHour();
}

StoreCollection.prototype.AddMember = function(storeLocation,minCustomer,maxCustomer,avgCookieSale,address,phoneNumber){
    this.locations.push(new Store(storeLocation,minCustomer,maxCustomer,avgCookieSale,address,phoneNumber));
}


/**
 * The start point for js file
 */
function initialize(){
    console.log('In initialize()');
        storeCollection = new StoreCollection()

        storeCollection.AddMember('Seattle',23,65,6.3,"1234 Fake Street","123-456-7890");
        
        storeCollection.AddMember('Tokyo',3,24,1.2,"1235 Fake Street","223-456-7890");
        
        storeCollection.AddMember('Dubai',11,38,3.7,"1236 Fake Street","323-456-7890");
        
        storeCollection.AddMember('Paris',20,38,2.3,"34 Fake Road","423-456-7890");
        
        storeCollection.AddMember('Lima',2,16,4.6,"23 Fictitious Street","523-456-7890");

    updateLocationListDisplay();

    updateLocationsSection();
}


/**
 * 
 * @param {string} storeLocation - city the store is located in
 * @param {number} minCustomer - the minimum number of customers
 * @param {number} maxCustomer - the maximum number of customers
 * @param {number} avgCookieSale - the average number of cookies sold
 * @param {string} address - the street address of the store
 * @param {string} phoneNumber - the phone number of the store
 */
function Store(storeLocation,minCustomer,maxCustomer,avgCookieSale,address,phoneNumber){
    this.storeLocation = storeLocation;
    this.minCustomer = minCustomer;
    this.maxCustomer = maxCustomer;
    this.avgCookieSale = avgCookieSale;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.cookiesByHour = this.getCookiesSoldByHour();
}

Store.prototype.getCookiesSoldByHour = function(){
    let result = [];
    for (let i = 0; i < storeCollection.hoursOfOp.length; i++) {
        let randomCustomer = random(this.maxCustomer,this.minCustomer)
        randomCustomer = Math.ceil(randomCustomer*storeCollection.curve[i]);
        let line = [storeCollection.hoursOfOp[i],Math.floor(randomCustomer*this.avgCookieSale)];
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
    for (let j = 0; j < storeCollection.hoursOfOp.length; j++) {
        const element = this.cookiesByHour;
        let td = document.createElement('td');
        td.innerText = element[j][1]+' cookies';
        tr.appendChild(td);
        total += element[j][1];
        storeCollection.hourlyTotals[j] += element[j][1];
    }
    let totalTd = document.createElement('td');
    totalTd.innerText = total;
    tr.appendChild(totalTd);
    parentElement.appendChild(tr);
}


/**
 * 
 * @param {number} max maximum number
 * @param {number} min minimum number
 * @returns {number} a random number between min and max inclusive
 */
function random(max,min){
    return Math.floor(Math.random()*(max-min+1)+min);
}

/**
 * Updates a div with a new article.
 */
function updateLocationListDisplay(){
    let div = document.getElementById('locationList');
    storeCollection.hourlyTotals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    if(div != null){
        div.innerHTML = '';
        buildLocationListDisplay();
        buildSecondTable();
    }
    console.log(storeCollection.locations);
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
 */
function buildLocationListDisplay(){

    let div = document.getElementById('locationList');
    let h2 = document.createElement('h2');
    h2.innerText = 'Locations';
    div.appendChild(h2);
    let table = document.createElement('table');
    table.setAttribute('id','salesTable');
    let headerTr = getHeaderRow();

    let totalTh = document.createElement('th');
    totalTh.innerText = "Daily Location Total";
    headerTr.appendChild(totalTh);

    table.appendChild(headerTr);
    storeCollection.locations.forEach(store => {
        store.render(table);
    });
    let tFooter = getTableFooter(storeCollection.hourlyTotals);
    
    table.appendChild(tFooter);
    div.appendChild(table);
}


function buildSecondTable(){
    let parent = document.getElementById("locationList");
    let table = document.createElement('table');
    table.appendChild(getHeaderRow());
    storeCollection.locations.forEach(store => {
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        th.innerText = store.storeLocation;
        tr.appendChild(th);
        for (let i = 0; i < storeCollection.hoursOfOp.length; i++) {
            const element = store.cookiesByHour[i][1];
            let td = document.createElement('td');
            td.innerText = getEmployeesNeeded(element)+" tossers";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    });
    parent.appendChild(table);
}

function getEmployeesNeeded(element){
    let result = Math.ceil(element/20);
    if (result < 2){
        result = 2;
    }
    return result;
}

function getHeaderRow(){
    let timeTr = document.createElement('thead');
    let emptyTd = document.createElement('td');
    timeTr.appendChild(emptyTd);
    for (let j = 0; j < storeCollection.hoursOfOp.length; j++) {
        let timeTh = document.createElement('th');
        timeTh.innerText = storeCollection.hoursOfOp[j];
        timeTr.appendChild(timeTh);
    }
    return timeTr;
}


function getTableFooter(hourlyTotals){

    let tFooter = document.createElement('tfoot');
    let totalRTh = document.createElement('th');
    totalRTh.innerText = "Totals";
    tFooter.appendChild(totalRTh);
    let grandTotal = 0;
    for (let k = 0; k < storeCollection.hoursOfOp.length; k++) {
        let td = document.createElement('td');
        grandTotal += hourlyTotals[k];
        td.innerText = hourlyTotals[k];
        tFooter.appendChild(td);
    }
    let grandTd = document.createElement('td');
    grandTd.innerText = grandTotal;
    tFooter.appendChild(grandTd);
    return tFooter;
}

let tr = document.createElement('tr')

/**
 * Builds a section for a location list.
 * @returns {ul} an unordered list of locations
 */
function buildLocationsSectionList(){
    let ul = document.createElement('ul');
    for (let i = 0; i < storeCollection.locations.length; i++) {
        let li = document.createElement('li');

        li.innerText = storeCollection.locations[i].storeLocation;
        if(storeCollection.locations[i].address != ""){
            li.innerText += " "+ storeCollection.locations[i].address;
        }
        li.innerText +=" "+storeCollection.hoursOfOp[0]+" to "+storeCollection.hoursOfOp[14];
        if(storeCollection.locations[i].phoneNumber != ""){
            li.innerText += " "+storeCollection.locations[i].phoneNumber;
        }

        ul.appendChild(li);
    }
    return ul
}


function formButtonPress(){
    clearErrorSpan();

    let aStoreLocation = document.getElementById("storeLocation").value.trim();
    let aMinCustomer = document.getElementById("minCustomer").value;
    aMinCustomer = parseInt(aMinCustomer);
    let aMaxCustomer = document.getElementById("maxCustomer").value;
    aMaxCustomer = parseInt(aMaxCustomer);
    let anAvgCookieSale = document.getElementById("avgCookieSale").value;
    anAvgCookieSale = Number(anAvgCookieSale);
    if(aStoreLocation != '' && aMinCustomer > 0 && aMaxCustomer > 0  && anAvgCookieSale > 0){
        if(aMinCustomer > aMaxCustomer){
            let temp = aMinCustomer;
            aMinCustomer = aMaxCustomer;
            aMaxCustomer = temp;
        }
        let anAddress = document.getElementById("address").value.trim();
        let aPhoneNumber = document.getElementById("phoneNumber").value.trim();
        if(!phoneNumberRE.test(aPhoneNumber)){
            aPhoneNumber = "";
        }
        let isInList = false;
        for (let i = 0; i < storeCollection.locations.length; i++) {
            const element = storeCollection.locations[i];
            if(element.storeLocation == aStoreLocation){
                isInList = true;
                storeCollection.UpdateLocationMember(aStoreLocation,aMinCustomer,aMaxCustomer,anAvgCookieSale,anAddress,aPhoneNumber);
            }
        }
        if(!isInList){
            storeCollection.AddMember(aStoreLocation,aMinCustomer,aMaxCustomer,anAvgCookieSale,anAddress,aPhoneNumber);
        }
        updateLocationListDisplay();
        restoreForm();
    }
    else{
        if(aStoreLocation == ''){
            document.getElementById("storeLocation").value = "";
            let span = document.getElementById("storeLocationError");
            span.innerText = "A location is required!";
            let br = document.createElement('br');
            span.appendChild(br);
        }
        if( aMinCustomer <= 0 ){
            document.getElementById("minCustomer").value = 0;
            let span = document.getElementById("minCustomerError");
            span.innerText = "A number greater than 0 is required!";
            let br = document.createElement('br');
            span.appendChild(br);
        }
        if( aMaxCustomer <= 0){
            document.getElementById("maxCustomer").value = 0;
            let span = document.getElementById("maxCustomerError");
            span.innerText = "A number greater than 0 is required!";
            let br = document.createElement('br');
            span.appendChild(br);

        }
        if( anAvgCookieSale <= 0){
            document.getElementById("avgCookieSale").value = 0;
            let span = document.getElementById("avgCookieSaleError");
            span.innerText = "A number greater than 0 is required!";
            let br = document.createElement('br');
            span.appendChild(br);

        }
        if(!phoneNumberRE.test(phoneNumber.value)){
            let span = document.getElementById("phoneNumberError");
            span.innerText = "That is not a valid phone number!";
            let br = document.createElement('br');
            span.appendChild(br);

        }
    }
    

}

function clearErrorSpan(){
    let span = document.getElementById("storeLocationError");
    span.innerText = "";
    span = document.getElementById("minCustomerError");
    span.innerText = "";
    span = document.getElementById("maxCustomerError");
    span.innerText = "";
    span = document.getElementById("avgCookieSaleError");
    span.innerText = "";
    span = document.getElementById("phoneNumberError");
    span.innerText = "";

}


function restoreForm(){
    document.getElementById("storeLocation").value = "";
    document.getElementById("minCustomer").value = 0;
    document.getElementById("maxCustomer").value = 0;
    document.getElementById("avgCookieSale").value = 0;
    document.getElementById("address").value = "";
    document.getElementById("phoneNumber").value = "";
    
}

initialize();