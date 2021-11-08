import { CartContext } from "../../Providers/Cart/index";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import logoBurguerKenzie from "../../assets/logo-burgerKenzie/logo-kenzie-burger.png";
import "./style.css";
import { BiSearch, BiCart, BiExit } from "react-icons/bi";

const Header = () => {
  const history = useHistory();
  const { cart, addProduct, deleteProduct, showCart } = useContext(CartContext);

  const btnShowCart = () => {
    showCart(true);
  };

  return (
    <header className="header_app">
      <div className="navigation">
        <div className="navigation_logo">
          <figure>
            <img src={logoBurguerKenzie} alt="Logo Burger Kenzie" />
          </figure>
        </div>

        <div className="navigation_options">
          <div className="icon_search">
            <BiSearch />
          </div>
          <div onClick={() => btnShowCart()} className="icon_cart">
            <BiCart />
          </div>
          <div className="icon_exit">
            <BiExit />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
