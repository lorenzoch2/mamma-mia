import { useParams } from "react-router-dom";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../assets/css/pizzadetails.css";

import Context from "../Context";

export default function Pizza() {
  const { id } = useParams();
  const { info, pizzasSelected, setPizzasSelected } = useContext(Context);

  const pizza = info.filter((p) => p.id.toString() === id.toString());

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

  console.log(pizza);

  return (
    <div className="card-container d-flex flex-wrap justify-content-center">
      {pizza.map((type) => (
        <Card className="cardDetail d-flex flex-row">
          <Card.Img src={type.img} alt={type.name} />
          <Card.Body>
            <Card.Title>Pizza {type.name}</Card.Title>
            <Card.Text>{type.desc}</Card.Text>
            <p>Ingredientes:</p>
            <ListGroup>
              {type.ingredients.map((ingredient) => (
                <ListGroup.Item key={ingredient}>{ingredient}</ListGroup.Item>
              ))}
            </ListGroup>
            <hr />
            <span>Precio: ${type.price}</span>
            <div>
            <Button
              className="pizzaPrice"
              variant="danger"
              onClick={() => sumarPizza(type.id)}
            >
              Añadir
            </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>


    /*<div className="container">
      {pizza.map((type) => (
        <div key={type.id} className="card-container d-flex flex-wrap justify-content-center">
          <div className="e-card e-card-horizontal">
          <img className="pizzaImg" src={type.img} alt={type.name} />
          <div className="e-card-stacked">
            <Card.Title className="pizzaName">Pizza {type.name}</Card.Title>

            <Card.Text>{type.desc}</Card.Text>
            <Card.Text className="pizzaIngredients">Ingredientes:</Card.Text>
            <ul>
              {type.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <p>${type.price}</p>
            <Button
              className="pizzaPrice"
              variant="danger"
              onClick={() => sumarPizza(type.id)}
            >
              Añadir
            </Button>
          </div>
          </div>
        </div>
      ))}
    </div>*/
  );
}
