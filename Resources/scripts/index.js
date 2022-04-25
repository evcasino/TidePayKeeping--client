const employeeUrl = "https://localhost:5001/tidepaykeeping-api/Employee"; //api to reach the employee table in database
var employeeList = [];
var myEmployees = {};

function logIn(){
    const email = document.getElementById("getEmail").value;
    const password = document.getElementById("getPassword").value;
    const getEmployeeApiUrl = employeeUrl + "/" + email + "/" + password;
    const userString = JSON.stringify(email);
    sessionStorage.setItem('userID', userString); //setting this so the next page can display the email the user entered
    fetch(getEmployeeApiUrl).then(function(response){ 
        return response.json();
    }).then(function(json) {
        employeeList=json;
        console.log(employeeList);
        let employee = determineEmpOrManager();
        if(employee == true)
        {
            window.location.href = "./clockInOutEmployee.html";
        }
        else
        {
            window.location.href = "./clockInOutManager.html";
        }
    }).catch(function(error) {
        let html=`<div style="color: red; font-family: copperplate;">Incorrect Email and/or Password. Try again!</div>`;
        document.getElementById("errorMsg").innerHTML=html;
        console.log(error);
    });
}

function determineEmpOrManager(){
    console.log("made it to determine");
    let employee = true;
    if (employeeList.managerID == null)
    {
        employee = false;
    }
    return employee;
}


function checkLogin(){
    //would be nice to eventually add in to 
    //let them know if email or password was incorrect or if both were incorrect...
    if (employeeList.empEmail = null)
    {
        html += `<div>Incorrect Email. Try again!</div>`
    }
    else
    {
        html = "<div>Incorrect Password. Try again!</div>";
    }
    return html;
}