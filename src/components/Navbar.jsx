import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi"
import "../assets/css/navbar.css";
import Context from "../Context";
import { useEffect, useContext } from "react";

export default function Navigation() {
  const { price, setPrice, pizzasSelected } = useContext(Context)
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "inactive");
  const logoPizza = "https://mammamiapizza.ca/wp-content/uploads/2019/11/mamma-mia-pizza-logo-web.png";

  function sumar(){
    const total = pizzasSelected.reduce((acc, item) => acc + (item.price ?? 0) * (item.cantidad ?? 0), 0);
    setPrice(total);
  }

  useEffect(() => {
    sumar();
  })

  return (
    <Navbar className="navbar" variant="light">
      <Container className="container">
        <Navbar.Brand>
          <NavLink to="/" className={setActiveClass}>
            <img src={logoPizza} alt="logo-pizza" />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Brand>
          <NavLink to="/order" className={setActiveClass}>
            <GiShoppingCart /> $ {price}
          </NavLink>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}