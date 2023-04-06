var data_to_export ;
const src = document.getElementById("weather_icon");
const form = document.getElementById('weather-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const location = document.getElementById('location').value;
  
  getWeather(location).then((data) => {
   console.log(data);
    
    document.getElementById('location').innerHTML = data.location;
    document.getElementById('temperature').innerHTML = data.temperature;
    document.getElementById('description').innerHTML = data.description;
    
  }).catch((error) => {
    console.error(error);
  });
});

async function getWeather(location) {
  const response = await fetch(`http://localhost:3000/weather?location=${location}`);
  const data = await response.json();
  localStorage.setItem('location', data.location );
  localStorage.setItem('temperature', data.temperature );
  localStorage.setItem('description', data.description );
  localStorage.setItem('icon', data.icon );
  //src.setAttribute("src", "/night icons/"+localStorage.getItem('icon')+".png");
  return data;
}









