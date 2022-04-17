const baseUrl = "https://localhost:5001/tidepaykeeping-api/Employee"; //api to reach the employee table in database
var employeeList = [];
var myEmployees = {};

function logIn(){
    const email = document.getElementById("getEmail").value;
    const password = document.getElementById("getPassword").value;
    const getEmployeeApiUrl = baseUrl + "/" + email + "/" + password;
    fetch(getEmployeeApiUrl).then(function(response){ 
        return response.json();
    }).then(function(json) {
        employeeList=json;
        window.location.href = "./clockInOutEmployee.html";
    }).catch(function(error) {
        let html=`<div style="color: red; font-family: copperplate;">Incorrect Email and/or Password. Try again!</div>`;
        document.getElementById("errorMsg").innerHTML=html;
        //console.log(error);
    });
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