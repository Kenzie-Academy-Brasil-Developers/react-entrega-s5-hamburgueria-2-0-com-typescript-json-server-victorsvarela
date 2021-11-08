import { ReactNode } from "react";
import { AuthProvider } from "./Auth/index";
import { CartProvider } from "./Cart/index";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <CartProvider>
      <AuthProvider>{children}</AuthProvider>
    </CartProvider>
  );
};

export default Providers;
