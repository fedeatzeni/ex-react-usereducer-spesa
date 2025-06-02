import { useState } from "react";

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts)

  function addToCart(product) {
    if (!addedProducts.find(p => p.name === product.name)) {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }])
    }
  }

  return (
    <>
      <h1>Prodotti</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p>{`${product.name} (${product.price.toFixed(2)}€)`}</p>

            <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>


      {addedProducts.length > 0 && <>
        <h1>Carrello</h1>
        <ul>
          {addedProducts.map((product, index) => (
            <li key={index}>
              <p>{`${product.quantity}x ${product.name} (${product.price.toFixed(2)}€)`}</p>
            </li>
          ))}
        </ul>
      </>}

    </>
  )
}

export default App
