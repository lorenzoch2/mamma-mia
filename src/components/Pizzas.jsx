import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/css/pizza.css";
import { useNavigate } from "react-router-dom";

import Context from "../Context";

export default function Home() {
  const { info, pizzasSelected, setPizzasSelected } = useContext(Context);

  const navigate = useNavigate();

  const pizzaDetailClick = (id) => {
    navigate(`/pizza/${id}`);
  };

  const sumarPizza = (id) => {
    const pizzaSelect = pizzasSelected.findIndex((p) => p.id === id);
    if (pizzaSelect >= 0) {
      const nueva = [...pizzasSelected];
      nueva[pizzaSelect].cantidad += 1;
      setPizzasSelected(nueva);
    } else {
      const nuevaPizza = info.find((p) => p.id === id);
      const datosPizza = {
        id: nuevaPizza.id,
        cantidad: 1,
        price: nuevaPizza.price,
        name: nuevaPizza.name,
        img: nuevaPizza.img,
      };
      setPizzasSelected([...pizzasSelected, datosPizza]);
    }
  };

  return (
    <div className="container cards">
      {info.map((type) => (
        <Card key={type.id} className="apiPizzas">
          <Card.Img className="pizzaImg" variant="top" src={type.img} />
          <Card.Body className="cardBody">
            <Card.Title className="cardTitle">Pizza {type.name}</Card.Title>
            <div>
              <h4>Ingredientes:</h4>
              <ul>
                {type.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <Card.Text>${type.price}</Card.Text>
            <Card.Footer>
              <div className="buttons">
                <Button onClick={() => pizzaDetailClick(type.id)}>
                  Ver más
                </Button>
                <Button
                  variant="danger"
                  className="button"
                  onClick={() => sumarPizza(type.id)}
                >
                  Añadir
                </Button>
              </div>
            </Card.Footer>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
