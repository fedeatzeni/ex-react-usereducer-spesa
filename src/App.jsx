import { useState, useReducer } from "react";

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
    const p = addedProducts.find(p => p.name === product.name)
    if (!p) {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }])
    }
    else { updateProductQuantity(p, p.quantity + 1); }
  }

  function updateProductQuantity(product, quantity) {
    if (quantity < 1 || isNaN(quantity)) return;
    setAddedProducts(addedProducts.map(p =>
      product.name === p.name ? { ...p, quantity } : p
    ));
  }

  function removeFromCart(product) {
    setAddedProducts(addedProducts.filter(p => { if (p !== product) return p }))
  }

  function sum() {
    const list = addedProducts.map(p => p.price * p.quantity)
    let sum = 0;
    list.forEach(el => { sum += el });
    return sum
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
              {/* <p>{`${product.quantity}x ${product.name} (${product.price.toFixed(2)}€)`}</p> */}
              <input type="number" min={1} value={product.quantity} onChange={(e) => updateProductQuantity(product, parseInt(e.target.value))} />
              <p>{`${product.name} (${product.price.toFixed(2)}€)`}</p>

              <button onClick={() => removeFromCart(product)}>Rimuovi dal carrello</button>
            </li>
          ))}
        </ul>
        <h2>Totale: </h2>
        <span>{`${sum().toFixed(2)}€`}</span>
      </>}

    </>
  )
}

export default App
