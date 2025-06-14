import './App.css';
import { useState } from "react";
import { useEffect } from "react";
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
//https://api.api-ninjas.com/v1/nutrition?query=VgwZGA7OKurpIYShchcQSg==I2aDA2RFhmny24ia

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
console.log(data)
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
<div className="App">
   <div className='heading'>
      <video autoPlay muted loop>
         <source src={video} type="video/mp4"/>
      </video>
      <h1>Nutrition Analysis</h1>

   </div>
   {stateLoader && 
   <LoaderPage />
   }

   <div>
      <form onSubmit={finalSearch} className='container'>
         <input
            placeholder="Search..."
            onChange={myRecipeSearch}
            className='search'
            />
         <button type="submit" className='buttonSearch'>Search</button>
      </form>
   </div>
   
   <div>
      {myNutrition && (
      <table  cellPadding="15">
         <tbody>
            {Object.entries(myNutrition[0]).map(([key, value]) => (
            <Nutrition key={key}
               label={key}
               quantity={value}/>
            ))}
         </tbody>
      </table>
      )}
   </div>
</div>
);
}
export default App;
