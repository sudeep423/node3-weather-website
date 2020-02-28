const request = require('request')


// const url = 'https://api.darksky.net/forecast/efaaac30fd5b8c543ca87d0f7557b21b/37.8267,-122.4233?lang=en'

// request({ url: url , json: true },(error,response) => {
//     if(error){
//         console.log('unable to connect')
//     } else if(response.body.error){
//         console.log('Unable to find location')
//     } else{
//         console.log(response.body.daily.data[0].summary+' It is currently ' + response.body.currently.temperature + ' degrees out. There is a '+response.body.currently.precipProbability + '% chance of rate')
//     }
//     })

const forecast = (latitude,longitude,callback)=> {
    const url = 'https://api.darksky.net/forecast/efaaac30fd5b8c543ca87d0f7557b21b/'+ latitude +','+ longitude

    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to server',undefined)
        } else if(body.error){
            callback('wrong coordinates',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary+' It is currently ' + body.currently.temperature + ' degrees out. Humidity is '+ body.currently.humidity + ' with visibility of '+  body.currently.visibility +'. There is a '+body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports  = forecast