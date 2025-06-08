
import { useState } from "react";
import { useEffect } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";

function App() {

  const [mySearch, setMySearch] = useState('');
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_KEY = 'VgwZGA7OKurpIYShchcQSg==I2aDA2RFhmny24ia';
  const APP_URL = 'https://api.api-ninjas.com/v1/nutrition';

  const fetchData = async () => {
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?query=${mySearch}`, {
      method: "GET",
      headers: {
        'X-Api-Key': APP_KEY,
      },
     
    
    });

    if (response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      alert('ingredients entered incorrectly');
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (mySearch.trim() !== "") {
      fetchData(mySearch);
    }
  }, [wordSubmitted])


  return (
    <div>
      {stateLoader && <LoaderPage />}

      <h1>Nutrition Analysis</h1>
      <form onSubmit={finalSearch}>
        <input
          placeholder="Search..."
          onChange={myRecipeSearch}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {myNutrition &&
          Object.entries(myNutrition[0])
            .map(([key, value]) =>
              <Nutrition
                label={key}
                quantity={value}
              />
            )
        }
      </div>
    </div>
  );
}

export default App;
