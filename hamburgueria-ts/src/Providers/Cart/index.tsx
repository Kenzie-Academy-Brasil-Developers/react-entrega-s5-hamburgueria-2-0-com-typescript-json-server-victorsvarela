import { createContext, ReactNode, useContext, useState } from "react";

// interface para tipar as props
interface CartProps {
  children: ReactNode;
}

interface CartProviderData {
  // cart é um array de produtos
  cart: Product[];

  // booleano de mostrar o cartinho na tela
  isShowCart: boolean;

  // addProduct recebe um produto e não tem retorno
  addProduct: (product: Product) => void;

  // deleteProducts recebe um produto e não tem retorno
  deleteProduct: (product: Product) => void;

  // quando apertar no ícone de carrinho, mostra na tela
  showCart: (value: boolean) => void;

  setIsShowCart: (value: boolean) => void;

  trashProduct: (value: Product) => void;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  url_img: string;
}

export const CartContext = createContext<CartProviderData>(
  {} as CartProviderData
);

export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isShowCart, setIsShowCart] = useState<boolean>(false);

  const addProduct = (product: Product) => {
    setCart([...cart, product]);
    console.log(cart);
  };

  const deleteProduct = (productToBeDeleted: Product) => {
    const idProduct = productToBeDeleted.id.toString();
    const newCart = [...cart];
    const positionDelete = cart
      .map((item) => item.id)
      .indexOf(productToBeDeleted.id);

    console.log("position delete: ", positionDelete);

    /* const newCart = cart.filter(
      (product) => product.title !== productToBeDeleted.title
    ); */
    newCart.splice(positionDelete, 1);
    console.log("cartSpliçado", newCart);
    setCart(newCart);
  };
  console.log(cart);

  const trashProduct = (productToBeTrashed: Product) => {
    const newCart = cart.filter((item) => item.id !== productToBeTrashed.id);

    setCart(newCart);
  };

  const showCart = (value: boolean) => {
    setIsShowCart(value);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        deleteProduct,
        showCart,
        isShowCart,
        setIsShowCart,
        trashProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
