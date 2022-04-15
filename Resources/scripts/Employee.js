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