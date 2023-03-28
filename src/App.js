import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Context from "./Context";

import Navbar from "./components/Navbar";
import Home from "./components/Pizzas";
import Pizza from "./components/PizzaDetails";
import Order from "./components/OrderDetail";

function App() {
  const [info, setInfo] = useState([]);
  const [price, setPrice] = useState(0);
  const [pizzasSelected, setPizzasSelected] = useState([]);

  useEffect(() => {
    consultarInformacion();
  },[]);

  const consultarInformacion = async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/pizzas.json`);
    const data = await response.json();
    setInfo(data);
  };

  const globalState = { info, setInfo, price, setPrice, pizzasSelected, setPizzasSelected };

  console.log("menu: ",info)
  console.log("seleccionadas: ",pizzasSelected)

  return (
    <div className="App">
      <Context.Provider value={globalState}>
        <BrowserRouter basename="/mamma-mia">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
