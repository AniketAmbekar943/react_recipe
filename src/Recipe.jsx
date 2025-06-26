import React, { useState } from "react";
import "./Recipe.css";
const api = import.meta.env.VITE_API_URL;

function Recipe() {
  const [dish, setDish] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const fetchRecipe = async () => {
    setError("");
    setRecipe(null);
    if (!dish.trim()) {
      setError("Please enter a dish name.");
      return;
    }
    try {
      const res = await fetch(`${api}/search.php?s=${encodeURIComponent(dish)}`)
      const data = await res.json();
      if (data.meals) {
        setRecipe(data.meals[0]);
      } else {
        setError("Recipe not found.");
      }
    } catch {
      setError("Error fetching recipe.");
    }
  };

  return (
    <div className="recipe-container">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        value={dish}
        onChange={e => setDish(e.target.value)}
        placeholder="Enter dish name"
      />
      <button onClick={fetchRecipe}>Get Recipe</button>
      {error && <p className="error">{error}</p>}
      {recipe && (
        <div className="recipe-details">
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3>Instructions</h3>
          <p>{recipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default Recipe;