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
//Main logic for generating calendar
/-----------------------------------------------------------------------------------------------------------------------/
//Display month. Decides what should be rendered based on month. . . The main logic for displaying calendar dates
function Display(dates, curmonth, curyear){ 
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
            createDateDisplay(datesAppended[i])
        }  
    }
    else{
        for(let i = 0; i < datesAppended.length; i++){
            createDateDisplay(datesAppended[i])
        }  
    }
    


    //Check if all 6 rows are filled in calendar. . . Fill if not.
    if(datesAppended.length != 42){
        first = datesAppended[datesAppended.length - 1];
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

function createDateDisplay(date){ 
    
    //Create document element
    newDay = document.createElement("div"); //Create date div box
    newDate = document.createElement("p");
    newDate.innerHTML = date.getDay(); 
    newDay.className = "createdDate";
    //Style Document Element
    newDate.style.margin = 0;
    newDay.style.alignItems = "center";
    newDay.style.justifyItems = "center";
    newDay.appendChild(newDate)
    
    if (date.getCurrent() != 0){ //When date outside current month. . .
        newDate.style.color = "grey"; //Set dates to some color on calendar to indicate.
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
    daysLeft = 6 - weekday; //Weekday is stored in a 0 index, this makes the math work. . .
    
    
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


//Initial launch
/-----------------------------------------------------------------------------------------------------------------------/
const d = new Date();
let curmonth = d.getMonth(); //initialize displayed month as actual month . . .
let curyear = d.getFullYear();

let dates = genDates(d);
Display(dates, curmonth, curyear);
