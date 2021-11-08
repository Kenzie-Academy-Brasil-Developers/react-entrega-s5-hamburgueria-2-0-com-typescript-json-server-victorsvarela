import { CartContext } from "../../Providers/Cart/index";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";
import api from "../../Services/api";
import "./style.css";
import CartProducts from "../../components/CartProducts";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  url_img: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { isShowCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/products/").then((response) => setProducts(response.data));
  }, []);

  //console.log(products);

  return (
    <>
      <div className="grade_home_showProducts">
        {products.map((item) => (
          <CardProduct
            id={item.id}
            name={item.name}
            category={item.category}
            price={item.price}
            url_img={item.url_img}
            type="showcase"
          />
        ))}
      </div>
      {isShowCart && <CartProducts />}
    </>
  );
};

export default Home;
