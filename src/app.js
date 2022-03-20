const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { hasSubscribers } = require('diagnostics_channel');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;
const app = express();
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, "../templates/partials");



app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Saad'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Saad'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Saad'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address'
        });
    } 

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({error});
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            })
        });
    });

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    
    console.log(req.query);
    res.send({
        products: []
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        message: "Help article not found!"
    });
});

app.get('*', (req, res) => {
  res.render('404',{
      message: 'My 404 Page'
    });  
});


app.listen(port, () => {
    console.log('The server is up on port ' + port);
});