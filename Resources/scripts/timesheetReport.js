const userString4 = JSON.parse(sessionStorage.getItem('userID'));
const timeReportUrl = "https://localhost:5001/tidepaykeeping-api/TimeReport";
var timeReportList = [];

function displayEmpID(){
    console.log(userString4);
    let html=`<a class="nav-link active" id="userID" aria-current="page" href="#">${userString4}</a>`;
    document.getElementById("UserLink").innerHTML=html;
}

function previousWeek(){

}

function nextWeek(){

}

function logOutTimesheet(){
    window.location.href = "./index.html";
}

function searchStartEnd(){
    let sDate = document.getElementById("startDate").value;
    let eDate = document.getElementById("endDate").value;
    
    console.log(sDate);
    console.log(eDate);
    const startDate = sDate;
    sessionStorage.setItem('userSDate', startDate);
    const endDate = eDate;
    sessionStorage.setItem('userEDate', endDate);

    if(startDate > endDate)
    {
        toggle();

    }
    else
    {
        window.location.href = "./timesheetEmployeeReport.html";
    }

}

function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var clockInM = document.getElementById('clockM');
    clockInM.classList.toggle('active');
}

function fetchData(){
    let sDate = sessionStorage.getItem('userSDate');
    let eDate = sessionStorage.getItem('userEDate');
    console.log(sDate);
    console.log(eDate);
    let employeeID = convertEmpEmail();
    const gettimeReportsUrl = timeReportUrl + "/" + employeeID + "/" + sDate + "/" + eDate;
    console.log(gettimeReportsUrl);
    // document.getElementById("displayEmpName").innerHTML = employeeID;
    //var myDate = myDate.getDay();
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var totalHoursWorked = 0;
    fetch(gettimeReportsUrl).then(function(response){ 
        return response.json();
    }).then(function(json) {
        timeReportList=json;
        console.log("1.0");
        let html = `<table>        
        <tr>
        <th>Day</th>
          <th>Date</th>
          <th>Start</th>
          <th>End</th>
          <th>Total</th>
        </tr>`;
        json.forEach((timeReportList) => {
            console.log("2.0");
            //console.log(timeReportList);
            //var myDate = timeReportList.dayofwork;
            //var myDay = myDate.getDay();
            //html += `<table>`;
            html += `<tr>`;
            html += `<td>`+ timeReportList.weekday+`</td>`;
            html += `<td>`+ timeReportList.dayofwork.substring(0, 10)+`</td>`;
            html += `<td >`+ timeReportList.clockinHour+`</td>`;
            html += `<td >`+ timeReportList.clockoutHour+`</td>`;
            html += `<td >`+ timeReportList.total+`</td>`;
            //html += `</table>`;

            totalHoursWorked += timeReportList.total;
        });
        html += `<tr><td></td><td></td>
        <th> Total Hours = </th>
        <td id= "tHours">${totalHoursWorked}</td>
        </tr></table>`;
        
        document.getElementById("datavalues").innerHTML = html;
        //document.getElementById("tHours").innerHTML = html;
        
    }).catch(function(error) {
        console.log(error);
    });

}

function convertEmpEmail(){
    let employeeID = '1';
    if(userString4 == "adams@tm.com")
    {
        employeeID = '1';
    }
    else if(userString4 == "bosley@tm.com")
    {
        employeeID = '2';
    }
    else if(userString4 == "conners@tm.com")
    {
        employeeID = '3';
    }
    else if(userString4 == "diaz@tm.com")
    {
        employeeID = '4';
    }
    else if(userString4 == "east@tm.com")
    {
        employeeID = '5';
    }
    else if(userString4 == "frederick@tm.com")
    {
        employeeID = '6';
    }
    return employeeID;
}

function logOutMgr(){
    console.log("made it");
    window.location.href = "./index.html";
}
