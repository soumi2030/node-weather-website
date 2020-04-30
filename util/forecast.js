const request= require('request');

const forecast = (latitude,longitude, callback)=>
{
  const url = 'http://api.weatherstack.com/current?access_key=143a7dbb84138524724364241a055930&query=' + latitude + ',' + longitude;
   request({url:url,json:true},(error,response)=>
   {
      if(error){
          callback('unable to connect',undefined)
      }
      else if(response.body.error)
      {
          callback('unable to find location  ', undefined)
      }
      else 
      {
          callback(undefined,response.body.current.weather_descriptions[0])
      }
   })

}
module.exports =forecast