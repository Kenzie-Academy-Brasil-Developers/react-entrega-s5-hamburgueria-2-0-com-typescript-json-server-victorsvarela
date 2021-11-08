import { CartContext } from "../../Providers/Cart/index";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";

interface Product {
  name: string;
  category: string;
  price: number;
  url_img: string;
  type: string;
}

const CardProductInCart = (product: Product) => {
  const { cart, addProduct, deleteProduct, trashProduct } =
    useContext(CartContext);
  const [quantityProducts, setQuantityProducts] = useState(0);

  console.log("produto: ", product);
  useEffect(() => {
    setQuantityProducts(
      cart.filter((item) => product.name === item.name).length
    );
  }, [cart]);
  console.log(cart);

  //cart.map((item) => console.log(item.name, product.name, quantityProducts));

  const addCart = (produto: Product) => {
    addProduct(produto);
  };
  const removeCart = (produto: Product) => {
    deleteProduct(produto);
  };

  const trashedProduct = (produto: Product) => {
    trashProduct(produto);
  };

  return (
    <>
      <div className="div_card_Product-inCart">
        <div className="product_card">
          <div className="div_image_product-inCart">
            <figure>
              <img src={product.url_img} alt={product.name} />
            </figure>
          </div>

          <div className="div_infos_products-inCart">
            <div>
              <h3>{product.name}</h3>
              <p onClick={() => trashedProduct(product)}>
                <BiTrash />
              </p>
            </div>
            <div>
              <div onClick={() => removeCart(product)}>-</div>
              {quantityProducts}
              <div onClick={() => addCart(product)}>+</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProductInCart;
