const employeeUrl = "https://localhost:5001/tidepaykeeping-api/Employee"; //api to reach the employee table in database
const timelogUrl = "https://localhost:5001/tidepaykeeping-api/Timelog";
var employeeList = [];
var myEmployees = {};
var timelogList = [];
var myTimelogs = {};
const userString = sessionStorage.getItem('userID');
const userString2 = JSON.parse(userString);
var employeeID;

function displayEmpID(){
    let html=`<a class="nav-link active" id="userID" aria-current="page" href="#">${userString2}</a>`;
    document.getElementById("UserLink").innerHTML=html;
}

function GetClock(){
    var d=new Date();
    var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds();
    if(nmin<=9) nmin="0"+nmin;
    if(nsec<=9) nsec="0"+nsec;
    
    var clocktext=""+nhour+":"+nmin+":"+nsec+"";
    document.getElementById('clockbox').innerHTML=clocktext;
    
} 

function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var clockInM = document.getElementById('clockM');
    clockInM.classList.toggle('active');
}

function convertEmpEmail(){
    let employeeID = '1';
    if(userString2 == "adams@tm.com")
    {
        employeeID = '1';
    }
    else if(userString2 == "bosley@tm.com")
    {
        employeeID = '2';
    }
    else if(userString2 == "conners@tm.com")
    {
        employeeID = '3';
    }
    else if(userString2 == "diaz@tm.com")
    {
        employeeID = '4';
    }
    else if(userString2 == "east@tm.com")
    {
        employeeID = '5';
    }
    else if(userString2 == "frederick@tm.com")
    {
        employeeID = '6';
    }
    return employeeID;
}

function clockIn(){

    let employeeID = convertEmpEmail();
    console.log("this is the empl id: " + employeeID);

    try{
        console.log("in the try");
        //let timelogUrl = "https://localhost:5001/tidepaykeeping-api/Timelog";
        const clockOut = '2012-12-21 03:00:00';
        //const clockInsUrl = `${timelogUrl}/${employeeID}/${clockOut}`;
        const getClockInsUrl = timelogUrl + "/" + employeeID + "/" + clockOut;
        console.log(getClockInsUrl);
        fetch(getClockInsUrl).then(function(response){ 
            return response.text();
        }).then(function(json) {
            timelogList=json;
            console.log(timelogList);
            postClockIn(employeeID);
        }).catch(function(error) {
            console.log(error);
        });
    }
    catch(Error)
    {
        //timelogList = null;
        console.log(Error);
        return timelogList;
    }
}

function postClockIn(employeeID){
    if(timelogList == "")
    {
        console.log("made it to clock in");
        const postClockInApiUrl = timelogUrl;
        const sendClockIn = {
            empID : employeeID,
        }
        fetch(postClockInApiUrl, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(sendClockIn)
        })
        .then((response)=>{
            console.log(response);
            myTimelogs = sendClockIn;
            console.log(myTimelogs);
        });
        var today = new Date();
        var clockInTime = today.getHours() + ":" + today.getMinutes();
        let html = `<div style="color: rgb(170, 9, 9);">${clockInTime}</div>`;
        document.getElementById('displayTimeStamp').innerHTML = html;

        var blur = document.getElementById('blur');
        blur.classList.toggle('active');
        var clockInM = document.getElementById('clockM');
        clockInM.classList.toggle('active');
    }
    else
    {
        let html = `<div style="color: rgb(170, 9, 9);">This user has already been clocked in.</div>`;
        document.getElementById('displayClockInError').innerHTML = html;
    } 
}

function clockOut(){
    
    let employeeID = convertEmpEmail();
    console.log(employeeID);

    //grabbing the timelogID of the user's already clocked in session so i can update the clockOut value to now
    const clockOut = '2012-12-21 03:00:00';
    const getClockInsUrl = timelogUrl + "/" + employeeID + "/" + clockOut;
    fetch(getClockInsUrl).then(function(response){ 
        return response.json();
    }).then(function(json) {
        timelogList=json;
        console.log(timelogList);
    }).catch(function(error) {
        console.log(error);
    });
    //console.log(timelogList);
    //console.log(timelogList[0].timelogID);

    if(timelogList != null)
    {
        const putClockOutApiUrl = timelogUrl;
        const sendClockOut = {
            empID : employeeID,
        }
        fetch(putClockOutApiUrl, {
            method: "PUT", 
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(sendClockOut)
        })
        .then((response)=>{
            myTimelogs = sendClockOut;
            console.log(myTimelogs);
        });

        var today = new Date();
        var clockOutTime = today.getHours() + ":" + today.getMinutes();
        let html = `<div style="color: rgb(170, 9, 9);">${clockOutTime}</div>`;
        document.getElementById('displayTimeStamp').innerHTML = html;

        var blur = document.getElementById('blur');
        blur.classList.toggle('active');
        var clockInM = document.getElementById('clockM');
        clockInM.classList.toggle('active');

    }
    else
    {
        let html = `<div style="color: rgb(170, 9, 9);">Clock out fail.</div>`;
        document.getElementById('displayClockInError').innerHTML = html;
    } 

}

function timesheetReport(){
    window.location.href = "./timesheetEmployeeSearch.html";
}
