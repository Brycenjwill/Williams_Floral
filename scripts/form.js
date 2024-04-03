const MONTHS = ["January", "February", "March", "April", "May","June","July","August","September","October","November","December" ];

//Handling the popup form
/-----------------------------------------------------------------------------------------------------------------------/
    const form = document.getElementById('appRequest');
    form.onsubmit = (event) => {
    //TODO: Get selected date/time
    const dateTime = document.getElementById("time-date").textContent.replace(",", "").split(" ");

    var month = dateTime[0];


    let i = 0;
    MONTHS.forEach(item => { //Find the month value index to be passed to db

        if(item === dateTime[0]){
             month = i; //Set month value
         }
         i += 1;
    })
    //console.log(month);

    var date = dateTime[1];
    var year = dateTime[2];
    let hour = localStorage.getItem("time");

    document.getElementById("year").value = year;
    document.getElementById("time").value = hour;
    document.getElementById("date").value = date;
    document.getElementById("month").value = month;
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var formData = new FormData(form);

    // Convert form data to JSON
    var jsonData = {};
    formData.forEach(function(value, key){
        jsonData[key] = value;

    });
    

    for (let obj of formData) {
        console.log(obj);
      }

    // Call function to send data to Google Apps Script

    sendDataToGoogleAppsScript(jsonData);

    
};

function sendDataToGoogleAppsScript(data) {
    // Define Google Apps Script URL
    var scriptURL = 'https://script.google.com/macros/s/AKfycbxIJmnIp3LKBAsvXX7Yngqf7ok3J69Pc9coWOtOsGgvWyIzU7KpQmFoMQ6zG6ZalBa9/exec';

    // Prepare payload
    var payload = {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
    };
    // Send data to Google Apps Script
    fetch(scriptURL, payload)
        .then(response => console.log('Form data sent successfully.'))
        .catch(error => console.error('Error sending form data:', error));
    //document.getElementById("appRequest").reset();

    document.getElementById("formbox").style.display = "none";
    document.getElementById("appRequest").reset();
    removeSmokeScreen(); //Clean the screen
}

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