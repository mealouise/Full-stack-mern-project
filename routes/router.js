const {Router} = require('express');
const router = Router();

//import weather.js function
//returns a promise of type any - means you have to 'await'
const getWeather = require('../lib/getWeather')

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/nasa', (req,res) => {
    res.render('nasa');
});

router.get('/getWeather', async (req,res) => {
    let data = await getWeather.getWeather()
    console.log(data)
    res.render('getWeather', {
        data,
        title: `You have been given weather ${data}`
    })
})

router.get('/harryPotter', async (req,res) => {
    let data = await this.getWeather.getHarryPotter()
    console.log(data)
    res.render('harryPotter', {
        data,
        title:`You have been randomy sorted into ${data}`
    })
})

router.get('/chuckNorris', async (req,res) => {
    let data = await getWeather.chuckNorris()
    console.log(data)
    res.render('chuckNorris', {
        data,
        title: `You have been given a random joke ${data}`
    })
})

router.get('/getNasaImage', async (req,res) => {
    let data = await getWeather.getNasaImage()
    let image = data.url
    console.log(data)
    res.render('getNasaImage', {
        image,
    })
})

router.post('/', async(req,res) => { // here you display the information
    let city = req.body.city;
    let countryCode = req.body.countryCode;
// dont want all logic so can use lib folder incase want to use the code elsewhere
    let data = await getWeather(city,countryCode);

    let weatherData = {
        main: data.weather[0].main,
        description: data.weather[0].description,
        sunrise: new Date(data.sys.sunrise), //converts into a proper date
        sunset: new Date(data.sys.sunset)
    }
    let icon = data.weather[0].icon;
    console.log(data);
    
    res.render('index', {weatherData, icon});
    //check on imsonia the get data works before build the front end
});

router.post('/nasa', async(req,res) => {
    let date = req.body.date;
    let data1 = await getNasaPicture(date);


    let nasaPicture = {
        date: req.body.date,
        explanation:req.body.explanation,
        hdurl: req.body.hdurl,
        title: req.body.title
    }
    console.log(data1);
    res.render('nasa',{nasaPicture});
});

// all routes go in here

module.exports = router; // bottom of the routes