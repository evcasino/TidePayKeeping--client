const timeReportUrl = "https://localhost:5001/tidepaykeeping-api/TimeReport";

function chartOnload(){
    const timeReportUrl = "https://localhost:5001/tidepaykeeping-api/TimeReport";
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
        console.log(response);
        return response.json();
        }).then(function(json) {
    console.log(json)
    myTimelogs = json;
    json.forEach((log) => {
        console.log(log.empID)
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
    console.log(employees);
    let myChart = document.getElementById('myChart').getContext('2d');
            let bar1Chart = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: employees,
                    datasets:[{
                        label:'Total Hours Worked',
                        data:[emp1T,emp2T,emp3T,emp4T,emp5T,emp6T],
                        backgroundColor:'lightskyblue',
                    }]
                }
   });
//    document.getElementById("mychart").innerHTML = html;
     }).catch(function(error) {
    console.log(error);
     })
}