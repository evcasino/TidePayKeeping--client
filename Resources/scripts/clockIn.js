const timelogUrl = "https://localhost:5001/tidepaykeeping-api/Timelog";
var timelogList = [];
const userString = localStorage.getItem('userID');
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
    var today = new Date();
    var clockInTime = today.getHours() + ":" + today.getMinutes();
    let html = `<div style="color: rgb(170, 9, 9);">${clockInTime}</div>`;
    document.getElementById('displayTimeStamp').innerHTML = html;

    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var clockInM = document.getElementById('clockM');
    clockInM.classList.toggle('active');
}