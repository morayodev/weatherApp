
//i used this cause the save button is coimg from the DOM
function openWeather() {
  document.querySelector(".modal").style.display = "block"
  console.log("btn")
}
// to cancel the icon
document.querySelector("#cancel").addEventListener("click", function () {
  document.querySelector(".modal").style.display = "none";

})
 
let box = document.querySelector(".input");

//want to fetch API
async function getWeather(location) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=abcde9bc74c343f1453d187cf4666743`);
    //return reponse json
    return response.json();
    
}
//for us to change location we need to create a function
function setWeather(input) {
  //calling the async function and sending the value it expecting
  getWeather(input)
    .then(data => {
      //DOM manipulation
      display = `
           <div class="sub-container">
            <h1>${data.sys.country},${data.name}</h1>
            <h3 class="weather">${data.weather[0].description}</h3>
            <h3 class="h3">${temperatureConverter(data.main.temp)} C,(${
        kelvinConverter(data.main.temp)}F)</h3>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
            </div>
            <div class="second-container">
                <h4>Relative Humidity:${data.main.humidity}</h4>
                <h4>Pressure:${data.main.pressure}</h4>
                <h4>Feels like:${data.main.feels_like}</h4>
                <h4>Sea level:${data.main.sea_level}</h4>
            </div>
            <button class="button" onclick="openWeather()">Change Location</button>

        `;
      document.querySelector(".main-container").innerHTML = display
      console.log(data)
    })


    .catch(error => console.log(error))
}
//conversion of kelvin to F
function kelvinConverter(valNum) {
    valNum = parseFloat(valNum);
    let valueNum = (valNum - 273.15) * 1.8 + 32;
    return valueNum.toFixed(2)
}
//conversion of kelvin to C
function temperatureConverter(valNum) {
  valNum = parseFloat(valNum);
    let valueNum =( valNum - 273.15);
    return valueNum.toFixed(2)
}
 //CALLING THE FUNCTION setWeather
setWeather("lagos")
//working with the input form
document.querySelector('.button4').addEventListener('click', function () {
  if (box.value ==="") {
    alert("fill in the detail")

  } else {
    setWeather(box.value)
    document.querySelector(".modal").style.display = "none";
    box.value = ''
    

  }
})
