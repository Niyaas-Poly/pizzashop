import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data.js";

function Header({ cartCount }) {
  return (
    <div className="header">
      <h1>Niyaas's Pizza Co.</h1>
      <div className="cart">
        🛒 Cart: {cartCount} {/* Display cart count */}
      </div>
    </div>
  );
}

function FeaturedPizza() {
  const featured = pizzaData[Math.floor(Math.random() * pizzaData.length)];
  
  return (
    <div className="featured-pizza">
      <h2>Featured Pizza</h2>
      <Pizza3 data={featured} />
    </div>
  );
}

function Menu({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPizzas = pizzaData.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pizza.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <input
        type="text"
        placeholder="Search pizzas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredPizzas.length > 0 ? (
        filteredPizzas.map((pizza) => (
          <Pizza3 key={pizza.name} data={pizza} addToCart={addToCart} />
        ))
      ) : (
        <p>No pizzas match your search.</p>
      )}
    </div>
  );
}

function Pizza3({ data, addToCart }) {
  return (
    <div className={`pizza ${data.soldOut ? "sold-out" : ""}`}>
      <img src={data.photoName} alt={data.name} />
      <h3>{data.name}</h3>
      <p>{data.ingredients}</p>
      <p className="price">${data.price}</p>
      {data.soldOut ? (
        <p>Sold Out</p>
      ) : (
        <button onClick={() => addToCart(data)} className="add-to-cart-btn">
          Add to Cart
        </button>
      )}
    </div>
  );
}

// Footer component
function Footer() {
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 10 && currentHour < 22;
  return (
    <footer className="footer">
      {isOpen ? "We’re currently open" : "Sorry we’re closed"}
    </footer>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const addToCart = (pizza) => {
    setCartCount(cartCount + 1);
    alert(`${pizza.name} added to cart!`);
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <button
        className="toggle-button"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <Header cartCount={cartCount} />
      <FeaturedPizza /> {/* Display the featured pizza */}
      <Menu addToCart={addToCart} />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
