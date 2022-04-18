const employeeUrl = "https://localhost:5001/tidepaykeeping-api/Employee"; //api to reach the employee table in database
const timelogUrl = "https://localhost:5001/tidepaykeeping-api/Timelog";
var employeeList = [];
var myEmployees = {};
var timelogList = [];
var myTimelogs = {};

function displayEmpID(){
    const userString = localStorage.getItem('userID');
    const userString2 = JSON.parse(userString);
    console.log(userString2);
    let html=`<a class="nav-link active" id="userID" aria-current="page" href="#">${userString2}</a>`;
    document.getElementById("UserLink").innerHTML=html;
}

function GetClock(){
    
    var d=new Date();
    var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds();
    if(nmin<=9) nmin="0"+nmin;
    if(nsec<=9) nsec="0"+nsec;
    
    var clocktext=""+nhour+":"+nmin+":"+nsec+"";
    document.getElementById('clockbox').innerHTML=clocktext;
    }
    
    GetClock();
    setInterval(GetClock,1000);

    function toggle(){

      var blur = document.getElementById('blur');
      blur.classList.toggle('active');
      var clockInM = document.getElementById('clockM');
      clockInM.classList.toggle('active');
}