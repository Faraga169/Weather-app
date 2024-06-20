const input=document.querySelector('.form-control');
const btn=document.querySelector('#btn');
const Api_key='59a7c527cf1f4663a3153417242006';
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let day=3;
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
// function getdata(datestring){
// for(let i=0;i<days.length;i++){
//    let day=days[new Date(datestring).getDay()];
//     console.log(day);
// }

// }
// getdata(6/20/2024);
input.addEventListener('keyup',function(e){
    getweatherday(e.target.value);
  
})

btn.addEventListener('click',function(){
   clearinput()
})



function clearinput(){
    input.value=null;
}


async function getweatherday(value){
    try{
   var response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${Api_key}&q=${value}&days=${day}`);
  var data=await response.json();
  console.log(data);
  Togetweathertoday(data.location,data.current);
  TogetnextTwodays( data.forecast.forecastday);
  
    }
    catch(error){
        console.log(error);
    }
}





function Togetweathertoday(location,current){

    let currentday=new Date(current.last_updated);
    let currentdate=`<div class="header d-flex justify-content-between p-2">
              <p>${days[currentday.getDay()]}</p>
              <p>${currentday.getDate()+monthNames[currentday.getMonth()]}</p>
             </div>
             <div class="body p-2">
              <p >${location.name}</p>
             <div class="bodytemp d-flex flex-wrap  p-2">
              <h2 class="h1 text-light">${current.temp_c} <sup>o</sup>
                                            C</h2>
               <img src="https:${current.condition
                                              .icon}" alt=""
                                               >
             </div>
             <p class="text-info">${current.condition.text}</p>

             <div class="icons d-flex">
              <div class="icon1 px-3 d-flex justify-content-between">
                <i class="fa-solid fa-umbrella my-1 mx-1"></i>
                 <p>20%</p>
              </div>
              <div class="icon1  px-3 d-flex justify-content-between">
                <i class="fa-solid fa-wind my-1 mx-1"></i>
                 <p>18km/h</p>
              </div>
              <div class="icon1  px-3 d-flex justify-content-between">
                <i class="fa-solid fa-compass my-1 mx-1"></i>
                 <p>East</p>
              </div>
             </div>
             </div>`

             document.querySelector(".item1 ").innerHTML = currentdate;
}




function TogetnextTwodays( forecastne){

let forecastnedays='';

for(let i=1;i<forecastne.length;i++){
    let nextday=new Date(forecastne[i].date);
    forecastnedays+=`
    <div class="col-lg-6">
              <div class="item2">
      
            <div class="header1  p-2 mx-auto">
           <p class=" text-center">${days[nextday.getDay()]}</p>
          </div>
           <div class="icon mx-auto text-center my-2">
            <img src="https:${forecastne[i].day.condition.icon}" alt="" width="90">
           </div>
           <div class="bodytemp text-center my-2">
            <h2 class="text-light">${forecastne[i].day.maxtemp_c
            } <sup>o</sup>
                                            C</h2>
            <p>${forecastne[i].day.mintemp_c}<sup>o</sup>
                                            C</p>
           </div>
           <div class="py-2">
            <p class="text-info text-center">${forecastne[i].day.condition.text}</p>
           </div>
            
            </div>
            </div>
    
          `
}

document.querySelector('.item2').innerHTML= forecastnedays;
}


