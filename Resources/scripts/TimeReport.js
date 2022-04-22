const employeeUrl = "https://localhost:5001/tidepaykeeping-api/Employee"; //api to reach the employee table in database
const timelogUrl = "https://localhost:5001/tidepaykeeping-api/Timelog";
const timeReportUrl = "https://localhost:5001/tidepaykeeping-api/TimeReport";
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

function getTimeLog(){
    console.log("inJSTL");

    let tempID = convertEmpEmail(userString2); 

    const getTimeLogUrl = timeReportUrl + '/' + tempID;

    fetch(getTimeLogUrl).then(function(response) {
        console.log(response);
        return response.json();
    }).then(function(json) {
        console.log(json)
        myTimelogs = json;
        let html = 
        `<table>
        <tr>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Total</th>
        </tr>`;
        json.forEach((log) => {
            console.log(log.empID)
            
            html += `<div>`;
            html += `<tr>`;
            html += `<td>`+log.dayofWork+`</td>`;
            html += `<td>`+log.clockIn+`</td>`;
            html += `<td>`+log.clockOut+`</td>`;
            html += `<td>`+log.total+`</td>`;
            html += `</tr>`;
            html += `</div>`;
        });
        html += `</table>`;
        console.log(html);
        // if(html === ``){
        //     html = "No Songs found :("
        // }
        document.getElementById("timeReport").innerHTML = html;

    }).catch(function(error) {
        console.log(error);
    })
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