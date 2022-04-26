const userString4 = sessionStorage.getItem('userID');
const userString5 = JSON.parse(userString4);
const timeReportUrl = "https://localhost:5001/tidepaykeeping-api/TimeReport";
var timeReportList = [];

function displayEmpID(){
    console.log(userString5);
    let html=`<a class="nav-link active" id="userID" aria-current="page" href="#">${userString5}</a>`;
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
    window.location.href = "./timesheetEmployeeReport.html";
}

function fetchData(){
    let sDate = sessionStorage.getItem('userSDate');
    let eDate = sessionStorage.getItem('userEDate');
    console.log(sDate);
    console.log(eDate);
    let employeeID = convertEmpEmail();
    const gettimeReportsUrl = timeReportUrl + "/" + employeeID + "/" + sDate + "/" + eDate;
    console.log(gettimeReportsUrl);

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
            html += `<td>`+ timeReportList.dayofwork+`</td>`;
            html += `<td >`+ timeReportList.clockinHour+`</td>`;
            html += `<td >`+ timeReportList.clockoutHour+`</td>`;
            html += `<td >`+ timeReportList.total+`</td>`;
            //html += `</table>`;

            totalHoursWorked += timeReportList.total;
        });
        html += `<tr><td></td><td></td>
        <td>Week Total = </td>
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
    if(userString5 == "adams@tm.com")
    {
        employeeID = '1';
    }
    else if(userString5 == "bosley@tm.com")
    {
        employeeID = '2';
    }
    else if(userString5 == "conners@tm.com")
    {
        employeeID = '3';
    }
    else if(userString5 == "diaz@tm.com")
    {
        employeeID = '4';
    }
    else if(userString5 == "east@tm.com")
    {
        employeeID = '5';
    }
    else if(userString5 == "frederick@tm.com")
    {
        employeeID = '6';
    }
    return employeeID;
}
