const {Router} = require('express');
const router = Router();

//import weather.js function
//returns a promise of type any - means you have to 'await'
const getWeather = require('../lib/getWeather')

router.get('/', (req,res) => {
    res.render('index');
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
    let data = await getWeather.getHarryPotter()
    console.log(data)
    res.render('harryPotter', {
        data,
        title:`You have been randomy sorted into ${data}`
    })
})


router.get('/getNasaImage', async (req,res) => {
    let data = await getWeather.getNasaImage()
    // let date = data.date,
    let image = data.url
    // let explanation = data.explanation
    console.log(data)
    res.render('getNasaImage', {
        image
    })
})

router.post('/', async(req,res) => { // here you display the information
    let city = req.body.city;
    let countryCode = req.body.countryCode;
// dont want all logic so can use lib folder incase want to use the code elsewhere
    let data = await getWeather.getWeather(city,countryCode);

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

router.get('/chuckNorris', async(req,res) => {
    let data = await getWeather.chuckNorris()
    data = JSON.parse(data)
    console.log(data.value)

    let joke = data.value
    res.render('chuckNorris', {
        data,
        joke: joke
    });
    });

router.post('/chuckNorris', async(req,res) => {
    let data = await getWeather.chuckNorris()
    console.log(data)
    let joke = data.categories.value;
    res.render('chuckNorris', {data: {joke}});
})

router.get('/cocktailInfo', async(req,res) => {
    let data = await getWeather.cocktailInfo()
    console.log(data)
    res.render('cocktailInfo', {
        data,
        title:`Your cocktail is ${data}`
    });
});

router.post('/cocktailInfo', async(req,res) => {
    let ingredient = req.body.ingredient;
    let data = await getWeather.cocktailInfo(ingredient);
    res.render('/cocktailInfo', {ingredient})
})


// get method needed for cocktail... 
// need to grab the data from getWeather.js

// router.post('/cocktailInfo', async(req,res) => {
//     let ingredient = req.body.strIngredient;

//     let data = await cocktailInfo(ingredient);

//     let strDescription = data.strDescription;
    
//     res.render('cocktailInfo', {strDescription});
// })

router.post('/getNasaImage', async(req,res) => {
    let data = await getWeather.getNasaImage()
    console.log(data)
    res.render('getNasaImage', {
        data,
        title: `Picture of the day ${data}`
    })
})

// all routes go in here

module.exports = router; // bottom of the routes