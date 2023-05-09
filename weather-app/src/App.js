//import hotBg from "./assets/hot.jpg";
//import coldBg from "./assets/cold.jpg";
import bgImage from "./assets/backgroundImage.jpg";
import Description from "./components/Description";
import { useEffect, useState } from "react";
import { getFormatedData } from "./weatherService";
  
  function App() {

    const [city, setCity] = useState('paris');
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState("metric");
    //const [bg, setBg] = useState(''); //enable for dynamic bg change

    useEffect(()=>{
      const fetchweatherData = async() => {
        const data = await getFormatedData(city, units);
        setWeather(data);

        //Dynamic background change
        /*
        const threshold = units === 'metric'? 20 : 60;
        if(data.temp <= threshold){
          setBg(coldBg);
        }else{
          setBg(hotBg);
        }
        */
      }
      fetchweatherData();
    }, [units, city])

    const handleUnitClick = (e) =>{
      const button =  e.currentTarget;
      const currentunit = button.innerText.slice(1);
      console.log(currentunit);
      
      const isCelsius = currentunit ===  'C';
      button.innerText = isCelsius ? '°F' : '°C';
      setUnits(isCelsius ? 'metric' : 'imperial');
    }

    const enterKeyPressed = (e) =>{
      if (e.keyCode === 13){
          setCity(e.currentTarget.value)
          e.currentTarget.blur();
          e.currentTarget.value = '';
      }
    }

    return (
      <div class="app" style={{backgroundImage:`url(${bgImage})`}}>
        <div class="overlay">
          {
            weather && (<div class="container">
            <div class="section section__inputs">
              <input required="required" 
                     onKeyDown={enterKeyPressed} 
                     type="text" 
                     name="city" 
                     placeholder="Enter City"/>
              <h3>Convert temperature unit to :</h3>
              <button onClick={(e)=> handleUnitClick(e)}>°F</button>
            </div>

            <div class="section section__temperature">
              <div class="temperatureDetails">
                <h1>{`${weather.temp.toFixed()}° ${units === 'metric' ? 'C' : 'F'}`}</h1>
                <h3>{weather.description}</h3>
                <h2>{`${weather.name}, ${weather.country}`}</h2>
              </div>
              <div class="icon">
                <img src={weather.iconURL} alt="weatherIcon" />
              </div>
              
            </div>
            <Description weather={weather} units={units}/>
          </div>
          )
        }  
        </div>
      </div>
    );
  }

  export default App;
