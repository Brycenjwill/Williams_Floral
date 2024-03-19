// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyA05IGiBsgQu67y08lM316H1FWBBUKmWl8",

  authDomain: "williams-floral-events.firebaseapp.com",

  projectId: "williams-floral-events",

  storageBucket: "williams-floral-events.appspot.com",

  messagingSenderId: "1069295116896",

  appId: "1:1069295116896:web:d2a1c53acc95e47e5d1905",

  measurementId: "G-6WTFJSS9VR"

};

let initialized = false;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore(); 


const MONTHS = ["January", "February", "March", "April", "May","June","July","August","September","October","November","December" ]

class Day{ 
    constructor(num, pos, current){
        this.dayofmonth = num;
        this.pos = pos;

        //An int for if the date is in current month. -1 is prev, 1 is post
        this.inCurrentMonth = current; 
    }

    addEvents(){
        //Get events associated with date when date is clicked
        return
    }

    getDay(){
        return this.dayofmonth;
    }

    getCurrent(){
        return this.inCurrentMonth;
    }

}

//Main logic for generating calendar
/-----------------------------------------------------------------------------------------------------------------------/
//Display month. Decides what should be rendered based on month. . . The main logic for displaying calendar dates
function displayCalendar(dates, curmonth, curyear){ 
    let datesAppended = [];
    if(getFirstOfMonth(curmonth, curyear) == 0){ //If the month start on a Sunday. . .
        datesAppended = dates;
    }
    else{ //When the month doesn't start on a suday. . . Use getPrevOverlap. . .combine lists
        let prevdates = getPrevOverlap(curmonth, curyear, getFirstOfMonth(curmonth, curyear));
        datesAppended = prevdates.concat(dates);
    }
    //If curmonth does not end on a saturday. . .
    if(getLastDayOfMonth(curmonth,curyear).getDay() != 6){ 
        let postdates = getPostOverlap(curmonth, curyear, getLastDayOfMonth(curmonth,curyear).getDay());
        datesAppended = datesAppended.concat(postdates); //Combine date lists. . .

        for(let i = 0; i < datesAppended.length; i++){
            createDateDisplay(datesAppended[i], curmonth, curyear)
        }  
    }
    else{
        for(let i = 0; i < datesAppended.length; i++){
            createDateDisplay(datesAppended[i], curmonth, curyear)
        }  
    }
    


    //Check if all 6 rows are filled in calendar. . . Fill if not.
    if(datesAppended.length != 42){
        let first = datesAppended[datesAppended.length - 1];
        //Check for if month ends on a saturday. . .
        if (first.getCurrent() == 0){
            first = new Day(0, null, 1);
        }
        //If not, fill the extra week with dates from next month.
        for(let i = 1; i <= 7; i++){
            let day = new Day(i + first.getDay(), null, 1);
            datesAppended.push(day);
            createDateDisplay(day);
        }

        //Double check for edge cases where 6 weeks aren't filled after first check. . .
        if(datesAppended.length != 42){
            first = datesAppended[datesAppended.length - 1];
            //Check for if month ends on a saturday. . .
            if (first.getCurrent() == 0){
                first = new Day(0, null, 1);
    
            }
    
            //If not, fill the extra week with dates from next month.
            for(let i = 1; i <= 7; i++){
                let day = new Day(i + first.getDay(), null, 1);
                createDateDisplay(day);
            }
    
        }
    }

    //Set month value to display above calendar
    let curmonthDate = new Date(curyear, curmonth);
    const month = curmonthDate.toLocaleString('default', { month: 'long' }); //Get month value from curmonth
    document.getElementById("monthValue").innerHTML = month + " " + curyear;
}

function createDateDisplay(date, curmonth, curyear){ 
    
    //Create document element
    let newDay = document.createElement("div"); //Create date div box
    let newDate = document.createElement("p");
    newDate.innerHTML = date.getDay(); 
    newDay.className = "createdDate";
    //Style Document Element
    newDate.style.margin = 0;
    newDay.style.alignItems = "center";
    newDay.style.justifyItems = "center";
    newDay.appendChild(newDate)
    
    if (date.getCurrent() == 0){ //When date outside current month. . .
        newDay.onclick = function(){displayEvents(curmonth, curyear, date.getDay())};
    }

    //If a user clicks on a date ahead of curmonth, move 1 month forward
    if (date.getCurrent() == 1){ 
        newDate.style.color = "grey"; //Set dates to some color on calendar to indicate.
        newDay.onclick = function(){nextMonth()};
    }

    //If a user clicks on a date behind curmonth, move 1 month back
    if (date.getCurrent() == -1){ 
        newDate.style.color = "grey"; //Set dates to some color on calendar to indicate.
        newDay.onclick = function(){prevMonth()};
    }

    document.getElementById("calendarbox").appendChild(newDay);
}
//Return last day of given month. . . Used for getting num of days to display per month. . .
function getLastDayOfMonth(month, year){
    return new Date(year, month+1, 0);
}

function getFirstOfMonth(month, year){ //Get weekday of first of given month
    return new Date(year, month, 1).getDay();//Day of week of 1st in month

}

function getPrevOverlap(curmonth, curyear, weekday){ 
    const prevm = new Date(curyear, curmonth - 1);
    let prevmonth = prevm.getMonth();
    let length = getLastDayOfMonth(prevmonth, curyear).getDate();
    let prevdates = [];
    weekday -= 1; //Weekday is stored in a 0 index, this makes the math work. . .


    while(weekday >= 0){ //Add dates per each missing date in week. . .
        let day = new Day(length - weekday, null, -1);
        prevdates.push(day);
        weekday -= 1;
    }
    return prevdates;
}

function getPostOverlap(curmonth, curyear, weekday){
    let postdates = [];
    let daysLeft = 6 - weekday; //Weekday is stored in a 0 index, this makes the math work. . .
    
    
    for(let i = 0; i < daysLeft; i++){ //Add dates per each missing date in week. . .
        let day = new Day(i+1, null, 1);
        postdates.push(day);
    }

    return postdates;
}

//Generage the dates list for current month.
function genDates(date){
    let dates = [];

    //Create all day objects for current month. . .
    for (let i = 1; i <= getLastDayOfMonth(curmonth, date.getFullYear()).getDate(); i++){
        let day = new Day(i, null, 0);
        dates.push(day);
    }
    return dates;
}

//Navigate between months
/-----------------------------------------------------------------------------------------------------------------------/

//Remove all calendar items for reset
function clearCalendar(){
    const toClear = document.getElementsByClassName("createdDate");
    while(toClear[0]){
        toClear[0].remove();
    }
}

//Shift month 1 to the past on button press
function prevMonth(){
    if (curmonth == 0){
        curmonth = 11;
        curyear -= 1;
    }
    else{
        curmonth -= 1;
    }
    const d = new Date(curyear, curmonth);
    let dates = genDates(d);

    clearCalendar();
    Display(dates, curmonth, curyear);
}

//Shift month 1 to future
function nextMonth(){
    if (curmonth == 11){
        curmonth = 0;
        curyear += 1;
    }
    else{
        curmonth += 1;
    }
    const d = new Date(curyear, curmonth);
    let dates = genDates(d);

    clearCalendar();
    Display(dates, curmonth, curyear);
}

//Date display on date click
/-----------------------------------------------------------------------------------------------------------------------/

//Grey the background out of the date display and display day calendar view
function smokeScreen(){
    document.getElementById("smokescreen").style.display = "block";
    document.getElementById("smokescreen").onclick = function(){removeSmokeScreen()};
    document.getElementById("eventDisplay").style.display = "flex";


    
}
//Remove smoke screen display and event display when smoke is clicked
function removeSmokeScreen(){
    document.getElementById("smokescreen").style.display = "none";
    document.getElementById("smokescreen").onclick = null; //Remove onclick to avoid issues.
    document.getElementById("eventDisplay").style.display = "none";
    document.getElementById("formbox").style.display = "none";

    //Handle the time display reset
    let hours = document.getElementsByClassName("time");
    for (let hour of hours){
        hour.style.backgroundColor = "white";
        hour.style.color = "black";
    }
}

//Display the form. Changes the form {iframe} url to match preset input from calendar date and time.
function displayForm(hour, curmonth, curyear, date){



    //Auto fill form with appropriate data by changing iframe src

    //Current iframe: https://docs.google.com/forms/d/e/1FAIpQLSfU6RFXiTkZchOvF23RndfTt5ihWuj5NGzM3oAqZRbao1eiBA/viewform?usp=pp_url&entry.106513577=1&entry.127550023=1&entry.1024640633=1&entry.657349170=2024-11-11&entry.1912670123=14:11
    let baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfU6RFXiTkZchOvF23RndfTt5ihWuj5NGzM3oAqZRbao1eiBA/viewform?usp=pp_url&entry.657349170=";
    
    //Format date values so they can be passed
    if(curmonth < 10){
        curmonth = String("0").concat(String(curmonth+1));
    }
    else{
        curmonth = String(curmonth+1);
    }

    if(date < 10){
        date = String("0").concat(String(date));
    }
    else{
        date = String(date);
    }

    let yearMonthDate = String(curyear).concat("-",curmonth,"-", String(date));
    let fillerUrl = "&entry.1912670123=";
    let time = String(hour).concat(":00");
    let formUrl = baseUrl.concat(yearMonthDate, fillerUrl, time)
    console.log(yearMonthDate);
    let form = document.getElementById("form");
    form.src = formUrl; //Change url of form to new form url
    document.getElementById("formbox").style.display = "block";
}


//Displaying the scheduled events when a day is clicked. . .
/-----------------------------------------------------------------------------------------------------------------------/
function displayEvents(curmonth, curyear, date, events=null){

    //Set date value to display at top of hours
    document.getElementById("time-date").innerHTML = MONTHS[curmonth].concat(" ", String(date), ", ", String(curyear));


    let hours = document.getElementsByClassName("time");
    //When events are passed back in display them
    if (events){

        for (let hour of hours){
            displayEvent(hour, events, curmonth, curyear, date);
        }
    }

    else if(events == null){
    smokeScreen();

    //Display hours no matter what
    for (let hour of hours){
        displayEvent(hour, [-1], curmonth, curyear, date); //events is sent in as [-1] so that none match hours in date
    }
    getEvents(curmonth, curyear, date);
    }
    else{
        return
    }

}

function displayEvent(hour, events, curmonth, curyear, date){
    if(events.includes(parseInt(hour.id))){ /*When the given time is taken up. . .*/
        hour.style.backgroundColor = "maroon";
        hour.style.color = "white";
        hour.onclick = "none";
    } 

    //If hour is not in events, then the user can request this time slot using a form.
    else{
        hour.onclick = function(){displayForm(hour.id, curmonth, curyear, date)};
    }
}
//Get events for given day. . .
function getEvents(curmonth, curyear, date){

    db.collection(String(curyear)).doc(String(curmonth)).get().then((snapshot) => {
    let events = snapshot.data()[String(date)]; //FINALLY GOT THE DATA!!!

    if(events){
    displayEvents(curmonth,curyear,date,events);
    }
    else{
        displayEvents(curmonth,curyear,date, 0);
    }
})

    
  }

  

//Initial launch
/-----------------------------------------------------------------------------------------------------------------------/
const d = new Date();
let curmonth = d.getMonth(); //initialize displayed month as actual month . . .
let curyear = d.getFullYear();

let dates = genDates(d);
displayCalendar(dates, curmonth, curyear);

//Cleanup. . .
/-----------------------------------------------------------------------------------------------------------------------/
document.getElementById("prevMonth").onclick = function(){prevMonth()};
document.getElementById("nextMonth").onclick = function(){nextMonth()};


