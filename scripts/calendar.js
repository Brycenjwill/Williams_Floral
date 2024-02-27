//Plans: 1. have the site pull from a list of monthy calendars based on 
///the current month, to lower processing time for site. Use number of days
//in current month to auto gen calendar??? Or pull from external calendar??

//Globals. . .
let dates = [];
const d = new Date();
let curmonth = d.getMonth(); //initialize displayed month as actual month . . .
let curyear = d.getFullYear();

class Day{ //Not sure if this will be useful . . .
    constructor(num, pos, current){
        this.dayofmonth = num;
        this.pos = pos;
        this.inCurrentMonth = current; //A boolean for if the date can be selected.
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

//Return last day of given month.
function getLastDayOfMonth(month, year){
    return new Date(year, month+1, 0);
}

function getFirstOfMonth(month, year){ //Get weekday of first of given month
    return new Date(year, month, 1).getDay();//Day of week of 1st in month

}

//Create all day objects for current month. . .
for (let i = 1; i <= getLastDayOfMonth(curmonth, d.getFullYear()).getDate(); i++){
    let day = new Day(i, null, true);
    dates.push(day);
}

//Get any dates from the previuos month that should display on calendar
function getPrevOverlap(curmonth, curyear, weekday){ 
    const prevm = new Date(curyear, curmonth - 1);
    let prevmonth = prevm.getMonth();
    let length = getLastDayOfMonth(prevmonth, curyear).getDate();
    let prevdates = [];
    weekday -= 1; //Weekday is stored in a 0 index, this makes the math work. . .


    while(weekday >= 0){ //Add dates per each missing date in week. . .
        let day = new Day(length - weekday, null, false);
        prevdates.push(day);
        weekday -= 1;
    }
    return prevdates;
}

function getPostOverlap(curmonth, curyear, weekday){
    let postdates = [];
    weekday -= 0; //Weekday is stored in a 0 index, this makes the math work. . .
    i = 0;
    while(i < (6-weekday)){ //Add dates per each missing date in week. . .
        let day = new Day(i, null, false);
        postdates.push(day);
        i += 1;
    }

    return postdates;
}

//Where the dates are generated on the calendar
function createDateDisplay(date){ 
    
    //Create document element
    newDay = document.createElement("div"); //Create date div box
    newDate = document.createElement("p");
    newDate.innerHTML = date.getDay(); 
    
    //Style Document Element
    newDate.style.margin = 0;
    newDay.style.alignItems = "center";
    newDay.style.justifyItems = "center";
    newDay.appendChild(newDate)
    
    if (date.getCurrent() == false){ //When date outside current month. . .
        newDate.style.color = "grey"; //Set dates to some color on calendar to indicate.
    }

    document.getElementById("calendarbox").appendChild(newDay);
}

//Display month. Decides what should be rendered based on month.
function Display(){ 
    if(getFirstOfMonth(curmonth, curyear) == 0){ //If the month start on a Sunday. . .
        let datesAppended = dates;

    }
    else{ //When the month doesn't start on a suday. . . Use getPrevOverlap. . .combine lists
        let prevdates = getPrevOverlap(curmonth, curyear, getFirstOfMonth(curmonth, curyear));
        let datesAppended = prevdates.concat(dates);

    //If curmonth does not end on a saturday. . .
        if(getLastDayOfMonth(curmonth,curyear).getDay() != 6){ 
            let postdates = getPostOverlap(curmonth, curyear, getFirstOfMonth(curmonth, curyear));
            datesAppended = datesAppended.concat(postdates); //Combine date lists. . .

            for(let i = 0; i < datesAppended.length; i++){
                createDateDisplay(datesAppended[i])
            }  

        }
        else{
            for(let i = 0; i < datesAppended.length; i++){
                createDateDisplay(datesAppended[i])
            }  
        }
        //Check if all 6 rows are filled in calendar. . .
        if(datesAppended.length != 42){
            console.log("too short. . .");
        }
    }
}


//Main Calls. . .
Display();
