import { CartContext } from "../../Providers/Cart/index";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import "../../GlobalStyle/main.css";
import CardProductInCart from "../CardProductInCart";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  url_img: string;
  type: string;
}

const CardProduct = (product: Product) => {
  const text = product.type === "showcase" ? "Adicionar" : "RemoveCart";

  console.log(product);

  const history = useHistory();
  const { cart, addProduct, deleteProduct } = useContext(CartContext);

  const addCart = (produto: Product) => {
    addProduct(produto);
  };

  return (
    <>
      {text === "Adicionar" && (
        <div className="div_card_Product">
          <div className="div_image_product">
            <figure>
              <img src={product.url_img} alt={product.name} />
            </figure>
          </div>
          <div className="div_infos_products">
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <h5>R$ {product.price}</h5>
          </div>
          <button onClick={() => addCart(product)}>Adicionar</button>
        </div>
      )}
    </>
  );
};

export default CardProduct;
