const express = require('express');
const request = require('request');
const fs = require('fs');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
var html = fs.readFileSync('./weather_front/weather.html', 'utf8')  
var html2 = fs.readFileSync('./weather_front/result.html', 'utf8')  
const app = express();
app.use(cors(corsOptions))

// Define the routes for the API
app.get('/weather', (req, res) => {

  res.send(html);
  const location = req.query.location;
  const apiKey = '76504ed81e2be2e6efcb598aefe418df';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  try{
  request(url, (err, response, body) => {
    if (err) {
      res.status(500).send({ error: 'Could not retrieve weather data' });
    } else {
      const data = JSON.parse(body);
      res.send({
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      });
      
      
    }
    
  });}
  catch(err){
    console.log(err);
  }

});

app.get('/result', (req,res)=>{

  try{
    res.send(html2);
  }
  catch(ee){
    console.log(err);
  }

})

// Start the server
app.listen(3000, () => {
  console.log('API listening on port 3000');
});