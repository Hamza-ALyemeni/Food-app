import { useEffect, useState } from "react";
import Header from "./components/Header";
import { fetchAppMeals } from './http.js'

function App() {
  const [meals , setMeals] = useState([]);
  const [cart , setCart] = useState([]);
  const[error , setError] = useState();

  useEffect(()=>{
    async function fetchMeals() {
      try {
        const data = await fetchAppMeals();
        console.log(data);
        setMeals(data);
      } catch (error) {
        setError({message : error.message || 'Failed to fetch user places'});
      }
    }

    fetchMeals();
  },[]);
  return (
    <>
      <Header />
      <div id="meals">
        {meals.map((meal) => {
          return (
            <div className="meal-item" key={meal.id}>
              <article >
                <img src={`http://localhost:3000/${meal.image}`} alt="" />
                <h3>{meal.name}</h3>
                <div className="meal-item-price">${meal.price}</div>
                <p className=".meal-item-description">{meal.description}</p>
                <button className="button">add to cart</button>
              </article> 
            </div>
          )
        })}
      </div>
    </>
  );
}

export default App;
