const userString7 = JSON.parse(sessionStorage.getItem('userID'));
const timeReportUrl = "https://localhost:5001/tidepaykeeping-api/TimeReport";
var timeReportList = [];

function displayEmpID(){
    let html=`<a class="nav-link active" id="userID" aria-current="page" href="#">${userString7}</a>`;
    document.getElementById("UserLink").innerHTML=html;
}

function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var clockInM = document.getElementById('clockM');
    clockInM.classList.toggle('active');
}

function chartOnload(){
    var employees =[];
    var total=[];
    var emp1T =0;
    var emp2T =0;
    var emp3T =0;
    var emp4T =0;
    var emp5T =0;
    var emp6T =0;
    var check1 = false;
    var check2 = false;
    var check3 = false;
    var check4 = false;
    var check5 = false;
    var check6 = false;

    fetch(timeReportUrl).then(function(response) {
        return response.json();
        }).then(function(json) {
    myTimelogs = json;
    json.forEach((log) => {
        switch(log.empID){
                case "1":
                    if(check1 == false)
                    {
                        employees.push("Alvin Adams")
                        check1=true;
                    }
                    emp1T +=log.total;
                    break;
                case "2":
                    if(check2 == false)
                    {
                        employees.push("Betty Bosley")
                        check2=true;
                    }
                    emp2T +=log.total;
                    break;
                case "3":
                    if(check3 == false)
                    {
                        employees.push("Creed Conners")
                        check3=true;
                    }
                    emp3T +=log.total;
                    break;
                case "4":
                    if(check4 == false)
                    {
                        employees.push("Doc Diaz")
                        check4=true;
                    }
                    emp4T +=log.total;
                    break;
                case "5":
                    if(check5 == false)
                    {
                        employees.push("Emilie East")
                        check5=true;
                    }
                    emp5T +=log.total;
                    break;
                case "6":
                    if(check6 == false)
                    {
                        employees.push("Fiona Frederick")
                        check6=true;
                    }
                    emp6T +=log.total;
                    break;

        }
    });
    var barColors = ["lightcoral", "lightgreen","lightblue","lightseagreen","bisque","lavender"];
    let myChart = document.getElementById('myChart').getContext('2d');
            let bar1Chart = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: employees,
                    datasets:[{
                        label:'Total Hours Worked',
                        data:[emp1T,emp2T,emp3T,emp4T,emp5T,emp6T],
                        backgroundColor:barColors,
                        
                    }]
                }
   });
//    document.getElementById("mychart").innerHTML = html;
     }).catch(function(error) {
    console.log(error);
     })
}

function tst(){
    let sDate = sessionStorage.getItem('userSDate');
    let eDate = sessionStorage.getItem('userEDate');
    if(sDate > eDate)
    {
        toggle();
    }
    const gettimeReportsUrl = timeReportUrl +  "/" + sDate + "/" + eDate;
    var employees =[];
    var empTotal=[];
    var empSalary=[28,15,16,17,18,19];
    var tOwed = 0;
    var emp1T = 0;
    var emp2T = 0;
    var emp3T = 0;
    var emp4T = 0;
    var emp5T = 0;
    var emp6T = 0;
    var check1 = false;
    var check2 = false;
    var check3 = false;
    var check4 = false;
    var check5 = false;
    var check6 = false;
    

    fetch(gettimeReportsUrl).then(function(response) {
        return response.json();
        }).then(function(json) {
    myTimelogs = json;
    json.forEach((log) => {
        
        switch(log.empID){
                case "1":
                    if(check1 == false)
                    {
                        employees.push("Alvin Adams")
                        check1=true;
                    }
                    emp1T +=log.total;
                    break;
                case "2":
                    if(check2 == false)
                    {
                        employees.push("Betty Bosley")
                        check2=true;
                    }
                    emp2T +=log.total;
                    break;
                case "3":
                    if(check3 == false)
                    {
                        employees.push("Creed Conners")
                        check3=true;
                    }
                    emp3T +=log.total;
                    break;
                case "4":
                    if(check4 == false)
                    {
                        employees.push("Doc Diaz")
                        check4=true;
                    }
                    emp4T +=log.total;
                    break;
                case "5":
                    if(check5 == false)
                    {
                        employees.push("Emilie East")
                        check5=true;
                    }
                    emp5T +=log.total;
                    break;
                case "6":
                    if(check6 == false)
                    {
                        employees.push("Fiona Frederick")
                        check6=true;
                    }
                    emp6T +=log.total;
                    break;
        }
        
    });

    empTotal.push(emp1T.toFixed(2),emp2T.toFixed(2),emp3T.toFixed(2),emp4T.toFixed(2),emp5T.toFixed(2),emp6T.toFixed(2));
    tOwed = (emp1T*28)+(emp2T*15)+(emp3T*16)+(emp4T*17)+(emp5T*18)+(emp6T*19);
    let html = `       
    <tr>
    <th>Employees</th>
    <th>Total Hours</th>
    <th>Salary</th>
    <th>$ Owed</th>
  </tr>`;
    for(let i = 0; i < employees.length; i++){
        html += `<tr>`;
        html += `<td>`+ employees[i]+`</td>`;
        html += `<td>`+ empTotal[i]+`</td>`;
        html += `<td>`+'$'+ empSalary[i] +'/hour'+`</td>`;
        html += `<td>`+ '$'+ (empSalary[i]*empTotal[i])+`</td>`;
        html += `<td>`+ '$'+ (empSalary[i]*empTotal[i]).toFixed(2)+`</td>`;


        html += `</tr>`;
    }
    html += `<td></td>`;
    html += `<td></td>`;
    html +='<th>Total Salary Owed: </th>';
    html +='<td>'+'$'+tOwed.toFixed(2)+'</td>';

    document.getElementById("datavalues").innerHTML = html;
     }).catch(function(error) {
    console.log(error);
     })
}

function searchStartEnd(){
    let sDate = document.getElementById("startDate").value;
    let eDate = document.getElementById("endDate").value;
    const startDate = sDate;
    sessionStorage.setItem('userSDate', startDate);
    const endDate = eDate;
    sessionStorage.setItem('userEDate', endDate);
}

function logOut(){
    window.location.href = "./index.html";
}