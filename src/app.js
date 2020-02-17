const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs')
const geoCode = require('../utils/geoCode');
const weatherApi = require('../utils/weather');

console.log(__dirname)
console.log(path.join(__dirname, '../public'));

const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, '../templates/partials')

//Configuring Servers
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPaths)

app.use(express.static(staticPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hamza'
    })
})
// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: "Hamza Waheed",
//         },
//         {
//             name: 'Arslan'
//         },
//         {
//             name: 'Umer'
//         }
//     ]);
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>This is About Page</h2>');
// })
app.get('/about', (req, res) => {
    res.render('about', {
        name: "Hamza",
        title: 'About Page'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geoCode(req.query.address, (error, locationProp) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            weatherApi(locationProp.long, locationProp.lat, (error, { currentTemperature, rain, forecast }) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                } else {
                    res.send({
                        temperature: currentTemperature,
                        rain: rain,
                        forecast: forecast,
                        address: req.query.address,
                        location: locationProp.location
                    });
                }
            })
        }

    })



})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'Please provide error'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        email: 'Plz send us email on ssas@ss.com',
        title: 'Help Page',
        name: 'Hamza'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404Page', {
        errorMessage: '404: Help Article Not Found',
        title: '404 Help Page',
        name: 'Hamza'
    })
})
app.get('*', (req, res) => {
    res.render('404Page', {
        errorMessage: '404 : Page not Found',
        title: '404 : Page',
        name: 'Hamza'
    })
})


app.listen(8000, () => { console.log('Server Up and running') });