const fetch = require('node-fetch');
const request = require('request');

const {
    promisify
} = require('util');

const promisifiedRequest = promisify(request);

/**
 * 
 * @param {String} city 
 * @param {String} countryCode ISO 1311 country code
 */
const getWeather = async(city,countryCode) => {
    //find how the api works first
    //dont want to hard code so in body of the function we can pass in the city and countrycode
    let url =`http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${process.env.APPID}`;
    // got url so want to use fetch to send a request to the data
    let data = await fetch(url);       // remember to install fetch                  
    // require to return as        json data
    return await data.json();
} 
getWeather()


const getHarryPotter = async () => { //requires no key
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/sortingHat`,
        json: true
    })
    return data.body
}
getHarryPotter();


const chuckNorris = async () => { //requres chuckNorris which you have to get node request and put the headers
    let data = await promisifiedRequest({
        url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
        headers: {
            'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
            'x-rapidapi-key': '1ffcae4966msh3f9a383ce79b1ccp1c9aeajsn3897ce54b04f',
            accept: 'application/json'
        }
    })
    return data.body
};
chuckNorris();


const getNasaImage = async () => {
    let data = await promisifiedRequest({
        url:  'https://nasaapidimasv1.p.rapidapi.com/getPictureOfTheDay',
        headers: {
            'x-rapidapi-host': 'NasaAPIdimasV1.p.rapidapi.com',
            'x-rapidapi-key': '1ffcae4966msh3f9a383ce79b1ccp1c9aeajsn3897ce54b04f',
            'content-type': 'application/x-www-form-urlencoded'
          },
          form: {}
       
    })
    return data.body
}
getNasaImage()

const cocktailInfo = async () => {
    let data = await promisifiedRequest({
        url: 'https://the-cocktail-db.p.rapidapi.com/search.php',
        qs: {i: ''},
        headers: {
            'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
            'x-rapidapi-key': '1ffcae4966msh3f9a383ce79b1ccp1c9aeajsn3897ce54b04f'
          }
    })
    return data.body
}
cocktailInfo();



module.exports = {

    getWeather,
    getHarryPotter,
    chuckNorris,
    getNasaImage,
    cocktailInfo

}