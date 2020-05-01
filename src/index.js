const express = require('express');
const hbs = require('hbs');
const path =require('path');
const app= express();
const port =process.env.PORT || 3000;
const geocode = require('../util/geocode');
const forecast = require('../util/forecast');

const viewSourcePath = path.join(__dirname,'../templates/views');
const partialDirectory = path.join(__dirname,'../templates/partials');
const publicDirectoryPath =path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialDirectory);
app.set('view engine', 'hbs');
app.set('views', viewSourcePath);
console.log(viewSourcePath)


app.get('', (req, res)=>
    {
     res.render('index')
    })
    app.get('/about', (req, res)=>
    {
     res.render('about')
    })
    app.get('/weather', (req, res)=>
    {
     if(!req.query.address){
         return res.send({
             error:'you must provide an address'})
     }

     geocode(req.query.address,(error,{latitude,longitude,location} = {})=>
     {
         if(error)
         {
            return res.send({
                error:'you must provide a valid address'})
        }
        forecast(latitude,longitude,(error,data)=>
        {
            if(error)
            {
                return res.send({
                    error:'you must provide a valid  input'})
            }
            else{
                res.send({
                    forecastdata:data,
                    location:location
                    
            })
       
            }
        })

   
         })

    });
    app.get('*', (req, res)=>
    {
     res.send('cannot find Page')
    })



    app.listen(port, ()=>
    {
        console.log('app listening on port '+port)
    })