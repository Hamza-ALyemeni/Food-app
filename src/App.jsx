import { useEffect, useState } from "react";
import Header from "./components/Header";
import { fetchAppMeals } from './http.js'
import Shop from "./components/Shop";

function App() {
  const [meals , setMeals] = useState([]);
  const [error , setError] = useState();
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  useEffect(()=>{
    async function fetchMeals() {
      try {
        const data = await fetchAppMeals();
        console.log(data);
        setMeals(data);
      } catch (error) {
        setError({message : error.message || 'Failed to fetch meals'});
      }
    }

    fetchMeals();
  },[]);

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = meals.find((mel) => mel.id === id);
        updatedItems.push({
          id: id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  
  return (
    <>
      <Header  
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}/>
      <Shop products={meals} onAdd={handleAddItemToCart}/>
    </>
  );
}

export default App;
