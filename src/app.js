const path = require("path")
const express = require("express")
const hbs = require("hbs")
const app = express()

const geoLocation = require("./utils/geoLocation")
const forecast = require("./utils/forecast")

const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views",viewsPath )
hbs.registerPartials(partialsPath)

app.use(express.static(path.resolve(__dirname, '../public')))

app.get("/home", (req, res) =>{
    res.render("index", {
        title:"Weather App",
        name:"Nihal"
    })
})

app.get("/about", (req, res) => {
  res.render("about", {
      title:"About the App",
      name:"Nihal"
  })
})

app.get("/weather", (req, res) =>{
    if(!req.query.address){
        return res.send({
            error:"Provide an address"
        })
    }
   geoLocation(req.query.address, (error, { latitude, longitude, location } = {}) =>{
       if(error) {
          return res.send({error})
       }
       forecast(latitude, longitude, (error, forecastData) => {
           if(error){
               return res.send({error})
           }
           res.send({
               forecast:forecastData,
               location,
               address:req.query.address
           })
       })
   })
})


app.get("*", (req, res) =>{
    res.render("404",{
        errorMessage:"Not found"
    })
})


app.listen(3000, () => {
    console.log("Service listening on PORT 3000")
})
