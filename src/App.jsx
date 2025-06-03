import { useState, useReducer } from "react";

function cartReducer(addedProducts, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existingProduct = addedProducts.find(p => p.name === action.payload.name);
      if (existingProduct) {
        return addedProducts.map(p => p.name === action.payload.name ? { ...p, quantity: p.quantity + 1 } : p);
      }
      else {
        return [...addedProducts, { ...action.payload, quantity: 1 }];
      }
    }

    case 'UPDATE_QUANTITY': {
      const { name, quantity } = action.payload;
      if (quantity < 1 || isNaN(quantity)) return addedProducts;
      return addedProducts.map(p =>
        p.name === name ? { ...p, quantity } : p
      );
    }

    case 'REMOVE_ITEM':
      return addedProducts.filter(p => p.name !== action.payload);

    default:
      return addedProducts;
  }
}


function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);
  // console.log(addedProducts)

  function sum() {
    return addedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }


  return (
    <>
      <h1>Prodotti</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p>{`${product.name} (${product.price.toFixed(2)}€)`}</p>

            <button onClick={() => dispatchCart({ type: 'ADD_ITEM', payload: product })}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>


      {addedProducts.length > 0 && <>
        <h1>Carrello</h1>
        <ul>
          {addedProducts.map((product, index) => (
            <li key={index}>
              {/* <p>{`${product.quantity}x ${product.name} (${product.price.toFixed(2)}€)`}</p> */}
              <input
                type="number"
                min={1}
                value={product.quantity}
                onChange={(e) =>
                  dispatchCart({
                    type: 'UPDATE_QUANTITY',
                    payload: { name: product.name, quantity: parseInt(e.target.value) },
                  })
                }
              />
              <p>{`${product.name} (${product.price.toFixed(2)}€)`}</p>

              <button onClick={() => dispatchCart({ type: 'REMOVE_ITEM', payload: product.name })}>Rimuovi dal carrello</button>
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
