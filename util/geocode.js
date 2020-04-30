const request= require('request');

const geocode = (address, callback)=>
{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic29sYWhpcmkiLCJhIjoiY2s5azJrangyMDQyZTNlbzZoajc4Z2YyYiJ9.Z9WrJZmXe67leKNwZN_-AA';
    request({ url:url ,json:true},(error,response)=>
    {
        if(error)
        {
            callback('unable to find response',undefined)
        }
        else if(response.body.features.length===0) {
            callback('unable to find location try another search',undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });

        }
    })
}

module.exports = geocode

