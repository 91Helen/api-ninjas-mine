import './App.css';
import { useEffect, useState, useCallback } from 'react';
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";
import video from './cooking-animation.mp4';

function App() {
  const [mySearch, setMySearch] = useState('');
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_KEY = 'VgwZGA7OKurpIYShchcQSg==I2aDA2RFhmny24ia';
  const APP_URL = 'https://api.api-ninjas.com/v1/nutrition';

 
  const fetchData = useCallback(async (query) => {
    setStateLoader(true);
    const response = await fetch(`${APP_URL}?query=${query}`, {
      method: "GET",
      headers: {
        'X-Api-Key': APP_KEY,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setMyNutrition(data);
    } else {
      alert('Ingredients entered incorrectly');
    }
    setStateLoader(false);
  }, [APP_KEY, APP_URL]); 

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  };

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  };

  
  useEffect(() => {
    if (wordSubmitted.trim() !== "") {
      fetchData(wordSubmitted);
    }
  }, [wordSubmitted, fetchData]);

  return (
    <div className="App">
      <div className='heading'>
        <video autoPlay muted loop>
          <source src={video} type="video/mp4"/>
        </video>
        <h1>Nutrition Analysis</h1>
      </div>

      {stateLoader && <LoaderPage />}

      <form onSubmit={finalSearch} className='form'>
        <input
          placeholder="Type fruit's or vegetable's name here..."
          onChange={myRecipeSearch}
          className='search'
        />
        <div className="button-wrapper">
          <button type="submit" className="buttonSearch">Search</button>
        </div>
      </form>

      <div>
        {myNutrition && (
          <div style={{ overflowX: 'auto' }}>
            <table cellPadding="15">
              <tbody>
                {Object.entries(myNutrition[0]).map(([key, value]) => (
                  <Nutrition
                    key={key}
                    label={key}
                    quantity={value}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
