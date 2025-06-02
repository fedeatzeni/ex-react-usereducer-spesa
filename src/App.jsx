function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  return (
    <>
      <h1>Prodotti</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <div>{product.name}</div>
            <div>{product.price + "€"}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
