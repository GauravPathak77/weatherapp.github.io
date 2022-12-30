
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
require("dotenv").config();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.render("index",{choice:true});
});

app.post("/",function(req,res){

const query = req.body.city;
const apikey = "c3a14b64fd3eb5f994230183700f79d1";
const unit = "metric";
url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const des = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const ImageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.render("index", {choice: false, Des: des, Query: query, Temp: temp ,ImageUrl: ImageURL });
  });
});
});



app.listen(PORT, ()=>{
  console.log('Server is running at port 3000');
});
