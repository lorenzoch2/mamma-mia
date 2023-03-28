import { useContext, useEffect } from "react";
import Context from "../Context";
import { Button } from "react-bootstrap";
import "../assets/css/orderDetail.css";

export default function Order() {
  const { price, setPrice, pizzasSelected, setPizzasSelected } =
    useContext(Context);

  const imprimirTabla = () => {
    const cart = pizzasSelected.map((p, index) =>
      p.cantidad > 0 ? (
        <tr key={index}>
          <td style={{border: "0"}}>
            <img className="foto-pizza" src={p.img} alt="foto-pizza" />
            <span> Pizza {p.name}</span>
          </td>
          <td style={{border: "0"}}>${p.price}</td>
          <td style={{border: "0"}}>
            <div className="cantidad">
              <div><Button variant="warning" onClick={() => restarPizza(p.id)}>
                -
              </Button></div>
              <div>{p.cantidad}</div>
              <div><Button variant="warning" onClick={() => sumarPizza(p.id)}>
                +
              </Button></div>
            </div>
          </td>
        </tr>
      ) : null
    );
    return cart;
  };

  const sumarPizza = (id) => {
    const pizzaSelect = pizzasSelected.findIndex((p) => p.id === id);
    const nueva = [...pizzasSelected];
    nueva[pizzaSelect].cantidad += 1;
    setPizzasSelected(nueva);
  };

  const restarPizza = (id) => {
    const pizzaSelect = pizzasSelected.findIndex((p) => p.id === id);
    const restar = [...pizzasSelected];
    restar[pizzaSelect].cantidad -= 1;
    const borrar = restar.filter((p) => p.cantidad !== 0);
    setPizzasSelected(borrar);
  };

  function sumar() {
    const total = pizzasSelected.reduce(
      (acc, item) => acc + (item.price ?? 0) * (item.cantidad ?? 0),
      0
    );
    setPrice(total);
  }

  useEffect(() => {
    sumar();
  });

  return (
    <div className="container detailTable">
      <h1>Detalles del pedido</h1>
      <table className="pTable">
        <thead>
          <tr>
            <th colSpan={1}>Detalle</th>
            <th>Precio</th>
            <th colSpan={3}>Cantidad</th>
          </tr>
        </thead>
        <tbody>{imprimirTabla()}</tbody>
      </table>
      <div className="container detailTable">
        <h1>Total: ${price}</h1>
        <Button variant="success">Ir a pagar</Button>
      </div>
    </div>
  );
}
