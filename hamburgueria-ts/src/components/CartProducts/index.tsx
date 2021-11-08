import { CartContext } from "../../Providers/Cart/index";
import "./style.css";
import { useContext, useState } from "react";
import CardProduct from "../CardProduct";
import CardProductInCart from "../CardProductInCart";

interface Product {
  name: string;
  category: string;
  price: number;
  url_img: string;
}

interface ShowCartContext {
  showCart: boolean;
}

const CartProducts = () => {
  const { cart, isShowCart, setIsShowCart } = useContext(CartContext);

  /* TRECHO DE CÓDIGO CONSULTADO EM:
    https://ichi.pro/pt/como-encontrar-objetos-unicos-em-uma-matriz-em-javascript-por-referencia-de-objeto-ou-pares-de-valores-chave-20973273845114
    */
  const objectsJSON = cart.map((object) => JSON.stringify(object));
  const objectsJSONSet = new Set(objectsJSON);
  const uniqueJSONArray = Array.from(objectsJSONSet);

  const newCartUnique = uniqueJSONArray.map((string) => JSON.parse(string));
  /* TRECHO DE CÓDIGO CONSULTADO EM:
    https://ichi.pro/pt/como-encontrar-objetos-unicos-em-uma-matriz-em-javascript-por-referencia-de-objeto-ou-pares-de-valores-chave-20973273845114
    */

  const closeCart = () => {
    setIsShowCart(!isShowCart);
  };

  return (
    <div className="div_cart">
      <div className="div_cart_container">
        <div className="div_card_name-inCart">
          <div>Carrinho de Compras</div>
          <div onClick={() => closeCart()}>X</div>
        </div>
        {newCartUnique.map((item, index) => (
          <CardProductInCart
            key={index}
            name={item.name}
            category={item.category}
            price={item.price}
            url_img={item.url_img}
            type="showCart"
          />
        ))}
      </div>
    </div>
  );
};

export default CartProducts;
