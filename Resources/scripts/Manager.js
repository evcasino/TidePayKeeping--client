const userString6 = sessionStorage.getItem('userID');
const userString7 = JSON.parse(userString);

function displayEmpID(){
    console.log(userString3);
    let html=`<a class="nav-link active" id="userID" aria-current="page" href="#">${userString7}</a>`;
    document.getElementById("UserLink").innerHTML=html;
}

function redirectManager(i){
    console.log(i);
    if(i == 1)
    {
        window.location.href = "./employeeInfo.html";
    }
    else if(i == 2)
    {
        window.location.href = "./employeeHistorySearch.html";
    }
    else if(i == 3)
    {
        window.location.href = "./chartReport.html";
    }
    else if(i ==4)
    {
        window.location.href = "./totalSalariesReport.html";
    }
    
}

function logOutMgr(){
    window.location.href = "./index.html";
}


