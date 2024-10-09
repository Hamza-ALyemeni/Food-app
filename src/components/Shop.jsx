export default function Shop({products,onAdd}) {
    return(
    <div id="meals">
        {products.map((meal) => (
            <div className="meal-item" key={meal.id}>
              <article >
                <img src={`http://localhost:3000/${meal.image}`} alt="" />
                <h3>{meal.name}</h3>
                <div className="meal-item-price">${meal.price}</div>
                <p className=".meal-item-description">{meal.description}</p>
                <button className="button" onClick={() => onAdd(meal.id)}>add to cart</button>
              </article> 
            </div>
            )   
        )}
    </div>
    )
}

