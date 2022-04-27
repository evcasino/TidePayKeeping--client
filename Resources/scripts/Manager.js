const userString6 = JSON.parse(sessionStorage.getItem('userID'));
const timeReportUrl = "https://localhost:5001/tidepaykeeping-api/TimeReport";
const employeeUrl = "https://localhost:5001/tidepaykeeping-api/Employee";
const timelogUrl = "https://localhost:5001/tidepaykeeping-api/Timelog";
var timeReportList = [];
var employeeList = [];

function displayEmpID(){
    console.log(userString6);
    let html=`<a class="nav-link active" id="userID" aria-current="page" href="#">${userString6}</a>`;
    document.getElementById("UserLink").innerHTML=html;
}

function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var clockInM = document.getElementById('clockM');
    clockInM.classList.toggle('active');
}

function searchMgrTimesheet(){
    let empID = document.getElementById("dropdownEmps").value;
    console.log(empID);
    let sDate = document.getElementById("startDate").value;
    let eDate = document.getElementById("endDate").value;
    console.log(empID);
    console.log(sDate);
    console.log(eDate);
    const employeeID = empID;
    sessionStorage.setItem('mgrEmpID', employeeID);
    const startDate = sDate;
    sessionStorage.setItem('mgrSDate', startDate);
    const endDate = eDate;
    sessionStorage.setItem('mgrEDate', endDate);

    if(startDate > endDate)
    {
        toggle();
    }
    else
    {
        window.location.href = "./timesheetManagerReport.html";
    }
}

function searchInTimesheet(){
    // let empID = document.getElementById("dropdownEmps").value;
    // console.log(empID);
    let empID = sessionStorage.getItem('mgrEmpID');
    let sDate = document.getElementById("startDate").value;
    let eDate = document.getElementById("endDate").value;
    console.log(empID);
    console.log(sDate);
    console.log(eDate);
    const employeeID = empID;
    // sessionStorage.setItem('mgrEmpID', employeeID);
    const startDate = sDate;
    sessionStorage.setItem('mgrSDate', startDate);
    const endDate = eDate;
    sessionStorage.setItem('mgrEDate', endDate);

    if(startDate > endDate)
    {
        toggle();
    }
    else
    {
        window.location.href = "./timesheetManagerReport.html";
    }
}

function fetchData(){
    let sDate = sessionStorage.getItem('mgrSDate');
    let eDate = sessionStorage.getItem('mgrEDate');
    let employeeID = sessionStorage.getItem('mgrEmpID');
    const gettimeReportsUrl = timeReportUrl + "/" + employeeID + "/" + sDate + "/" + eDate;
    let empName = convertEmpName(employeeID);
    //var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var totalHoursWorked = 0;
    fetch(gettimeReportsUrl).then(function(response){ 
        return response.json();
    }).then(function(json) {
        timeReportList=json;
        let html = `<table>
        <tr><th style="text-align: center;">${empName}</th></tr>
        </table>
        <table>      
        <tr>
        <th>Day</th>
          <th>Date</th>
          <th>Start</th>
          <th>End</th>
          <th>Total</th>
        </tr>`;
        json.forEach((timeReportList) => {
            html += `<tr>`;
            html += `<td>`+ timeReportList.weekday+`</td>`;
            html += `<td>`+ timeReportList.dayofwork.substring(0, 10)+`</td>`;
            html += `<td >`+ timeReportList.clockinHour+`</td>`;
            html += `<td >`+ timeReportList.clockoutHour+`</td>`;
            html += `<td >`+ timeReportList.total+`</td>`;

            totalHoursWorked += timeReportList.total;
            console.log(totalHoursWorked);
        });
        html += `</table>
        <table>
        <th> Total Hours = </th>
        <td id= "tHours">${totalHoursWorked}</td>
        </table>`;
        
        document.getElementById("datavalues").innerHTML = html;
        //document.getElementById("tHours").innerHTML = html;
        
    }).catch(function(error) {
        console.log(error);
    });

}

function convertEmpName(employeeID){
    let empName = "Alvin, Adams";
    if(employeeID == '2')
    {
        empName = "Bosley, Betty"
    }
    else if(employeeID == '3')
    {
        empName = "Conners, Creed"
    }
    else if(employeeID == '4')
    {
        empName = "Diaz, Doc"
    }
    else if(employeeID == '5')
    {
        empName = "East, Emilie"
    }
    else if(employeeID == '6')
    {
        empName = "Frederick, Fiona"
    }
    return empName;
}

function fetchEmpInfo(){
    fetch(employeeUrl).then(function(response){ 
        return response.json();
    }).then(function(json) {
        employeeList=json;
        console.log(employeeList);
        let html = `<table>        
        <tr>
          <th>EmpID</th>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Salary/Hr</th>
        </tr>`;
        json.forEach((employeeList) => {
            console.log("2.0");
            console.log(employeeList.empEmail);
            html += `<tr>`;
            html += `<td>`+ employeeList.empID +`</td>`;
            html += `<td >`+ employeeList.empLName + ", " + employeeList.empFName +`</td>`;
            html += `<td >`+ employeeList.empRole +`</td>`;
            html += `<td >`+ employeeList.empEmail +`</td>`;
            html += `<td >`+ employeeList.salaryByHr +`</td>`;
            
        });
        html += `</table>`;
        
        document.getElementById("employeeInfo").innerHTML = html;
        
    }).catch(function(error) {
        console.log(error);
    });
}

function override(){
    let sDate = sessionStorage.getItem('mgrSDate');
    let eDate = sessionStorage.getItem('mgrEDate');
    let employeeID = sessionStorage.getItem('mgrEmpID');
    const gettimeReportsUrl = timeReportUrl + "/" + employeeID + "/" + sDate + "/" + eDate;
    let empName = convertEmpName(employeeID);
    //var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var totalHoursWorked = 0;
    fetch(gettimeReportsUrl).then(function(response){ 
        return response.json();
    }).then(function(json) {
        timeReportList=json;
        let html = `<table>
        <tr><th style="text-align: center;">${empName}</th></tr>
        </table>
        <table>      
        <tr>
        <th>Day</th>
          <th>Date</th>
          <th>Start</th>
          <th>End</th>
          <th>Total</th>
        </tr>`;
        var count = 0;
        json.forEach((timeReportList) => {
            count ++; 
            html += `<tr>`;
            html += `<td>`+ timeReportList.weekday+`</td>`;
            html += `<td>`+ timeReportList.dayofwork.substring(0, 10)+`</td>`;
            html += `<td><input style="width: 90%;" type="text" id="newClockIn" name="row-1-age" value="${timeReportList.clockinHour}"></td>`;
            html += `<td><input style="width: 90%;" type="text" id="newClockOut" name="row-1-age" value="${timeReportList.clockoutHour}"></td>`;
            html += `<td >`+ timeReportList.total+`</td>`;

            totalHoursWorked += timeReportList.total;
            console.log(totalHoursWorked);
        });
        html += `</table>
        <table>
        <th> Total Hours = </th>
        <td id= "tHours">${totalHoursWorked}</td>
        </table>
        <br><br>
        <button type="button" class="btn btn-success" onclick="saveChanges(count)">Save Changes</button>`;
        
        document.getElementById("datavalues").innerHTML = html;
        
    }).catch(function(error) {
        console.log(error);
    });
}

function saveChanges(){
    const putTimelogUrl = timelogUrl;
    console.log(putTimelogUrl);
    const sendTimelog = {
        clockIn : document.getElementById("newClockIn").value,
        clockOut : document.getElementById("newClockOut").value,
        empID : sessionStorage.getItem('mgrEmpID'),
    }
    fetch(putTimelogUrl, {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(sendTimelog)
    })
    .then((response)=>{
        console.log("yay");
    });
}

function logOutMgr(){
    console.log("made it");
    window.location.href = "./index.html";
}

function logOut(){
    console.log("made it");
    window.location.href = "./index.html";
}


