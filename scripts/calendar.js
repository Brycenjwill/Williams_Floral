//Plans: 1. have the site pull from a list of monthy calendars based on 
///the current month, to lower processing time for site. Use number of days
//in current month to auto gen calendar??? Or pull from external calendar??

class Day{ //Not sure if this will be useful . . .
    constructor(num, pos){
        this.dayofmonth = num;
        this.pos = pos; //Set position of 
    }

    addEvents(){
        //Get events associated with date when date is clicked
        return
    }

    getDay(){
        return this.dayofmonth;
    }

    display(){
        //Display date in calendar
    }
}

class Event{ //Events are created when a date is selected. Then they are deleted
    constructor(time){
        this.time = time; //Set time of event to display
    }
    display(){
        //Display event in popup
    }
}


    
    
    
function getDaysInMonth(month, year){
        return new Date(year, month+1, 0).getDate();
    }
    
    

let dates = [];

const d = new Date();
let curmonth = 3; //initialize displayed month as actual month . . .
let curyear = d.getFullYear();

function getFirstOfMonth(month, year){ //Get weekday of first of given month
    return new Date(year, month, 1).getDay();//Day of week of 1st in month

}

//Create all date ob
for (let i = 1; i <= getDaysInMonth(curmonth, d.getFullYear()); i++){
    let day = new Day(i);
    dates.push(day);
}


function Display(){ //display calendar
    if(getFirstOfMonth(curmonth, curyear) == 1){ //If the month start on a Sunday. . .
        for(let i = 0; i < dates.length; i++){
            newDay = document.createElement("p"); //test create paragraph
            newDay.innerHTML = dates[i].getDay();
            newDay.style.margin = 0;
            document.getElementById("calendarbox").appendChild(newDay);
        }
    }
}

Display();
