const userString4 = sessionStorage.getItem('userID');
const userString5 = JSON.parse(userString);

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

