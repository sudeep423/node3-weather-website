const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and views
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to server
app.use(express.static(publicDirectoryPath))



app.get('',(req,res) =>{
    res.render('index',{
        title: 'weather app',
        name: 'sudeep'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'sudeep'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'this is the help page',
        title: 'help',
        name: 'Sudeep'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'No address'
        })
    }
    const address = req.query.address

    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            return res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
})
// app.com
//app.com/help
app.get('/help/*',(req,res) => {
    res.render('errorHandler',{
        title: '404',
        error: 'Help article not fount'
    })
})

app.get('*',(req,res) =>{
    res.render('errorHandler',{
        title: '404',
        error: 'Page not found'
    })
})


app.listen(port,() =>{
    console.log('server is up on port ' + port)
})
