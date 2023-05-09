const API_KEY = '534f0b919bc1c0e16c148d36dd9734d4';
const makeIconURL = (iconID) => `http://openweathermap.org/img/wn/${iconID}@2x.png`

const getFormatedData = async(city, units = 'metric') =>{

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`

    const data = await fetch(URL)
    .then((res)=> res.json())
    .then((data)=> data);

    const {
        weather, 
        main:{temp, feels_like, temp_min, temp_max, pressure, humidity},
        wind:{speed},
        sys:{country},
        name,
     } = data;
    console.log(data);

    const {description, icon } = weather[0];

    return{
        description, 
        iconURL: makeIconURL(icon), 
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        pressure, 
        humidity, 
        speed, 
        country, 
        name,
    }
}

export {getFormatedData};