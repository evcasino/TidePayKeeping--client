const employeeUrl = "https://localhost:5001/tidepaykeeping-api/Employee"; //api to reach the employee table in database
const timelogUrl = "https://localhost:5001/tidepaykeeping-api/Timelog";
var employeeList = [];
var myEmployees = {};
var timelogList = [];
var myTimelogs = {};
const userString = localStorage.getItem('userID');
const userString2 = JSON.parse(userString);
var employeeID;

function displayEmpID(){
    let html=`<a class="nav-link active" id="userID" aria-current="page" href="#">${userString2}</a>`;
    document.getElementById("UserLink").innerHTML=html;
}

function convertEmpEmail(){
    let employeeID = '1';
    if(userString2 == 'adams@tm.com')
    {
        employeeID = '1';
    }
    else if(userString2 == 'bosley@tm.com')
    {
        employeeID = '2';
    }
    else if(userString2 == 'conners@tm.com')
    {
        employeeID = '3';
    }
    else if(userString2 == "diaz@tm.com")
    {
        employeeID = '4';
    }
    else if(userString2 == 'east@tm.com')
    {
        employeeID = '5';
    }
    else if(userString2 == 'frederick@tm.com')
    {
        employeeID = '6';
    }
    return employeeID;
}

function GetClock(){
    
    var d=new Date();
    var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds();
    if(nmin<=9) nmin="0"+nmin;
    if(nsec<=9) nsec="0"+nsec;
    
    var clocktext=""+nhour+":"+nmin+":"+nsec+"";
    document.getElementById('clockbox').innerHTML=clocktext;
    }
    
    GetClock();
    setInterval(GetClock,1000);

    function clockIn(){
        var blur = document.getElementById('blur');
        blur.classList.toggle('active');
        var clockInM = document.getElementById('clockM');
        clockInM.classList.toggle('active');

        let employeeID = convertEmpEmail();
        console.log(employeeID);
        console.log("made it to post for clock-In")
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
            myTimelogs = sendClockIn;
            console.log(myTimelogs);
        });

        //how do i get the id if it's auto incrementing... but i need to update this timelog later somehow

        var today = new Date();
        var clockIntime = today.getHours() + ":" + today.getMinutes();
        let html = `<div style="color: rgb(170, 9, 9);">${clockIntime}</div>`;
        document.getElementById('displayTimeStamp').innerHTML = html;
    }

    function clockOut(){
        var blur = document.getElementById('blur');
        blur.classList.toggle('active');
        var clockInM = document.getElementById('clockM');
        clockInM.classList.toggle('active');

        //need to get the timelog created above to update the clock-out time

        console.log("made it to post for clock-Out")
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
            myTimelogs = sendClockIn;
            console.log(myTimelogs);
        });
}