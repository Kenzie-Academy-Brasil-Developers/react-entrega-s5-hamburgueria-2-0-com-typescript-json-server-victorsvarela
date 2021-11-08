import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface AuthProps {
  children: ReactNode;
}

interface AuthProviderData {
  authToken: string;

  signIn: (userData: DataLogin) => void;

  Logout: () => void;

  Register: (userData: DataRegister) => void;
}

interface DataLogin {
  email: string;
  password: string;
}

interface DataRegister {
  email: string;
  password: string;
  name: string;
  age: number;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export const AuthProvider = ({ children }: AuthProps) => {
  const history = useHistory();

  // Dessa forma adicionamos ao state o token caso ele exista no localStorage
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  // Função para registrar na aplicação
  const Register = (userData: DataRegister) => {
    axios
      .post("https://api-kenzieburger.herokuapp.com/register/", userData)
      .then((response) => {
        console.log(response);
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  // Função para logar na aplicação, recebe os dados pegos do form de login
  const signIn = (userData: DataLogin) => {
    axios
      .post("https://api-kenzieburger.herokuapp.com/login/", userData)
      .then((response) => {
        // setamos no localStorage o token, caso tenhamos a resposta esperada
        localStorage.setItem("token", response.data.token);
        // setamos no state o token, caso tenhamos a resposta esperada
        setAuthToken(response.data.token);
        console.log("data", userData);
        // redirecionamos para a página logado
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  // Função para deslogar da aplicação
  const Logout = () => {
    // limpando o localStorage
    localStorage.clear();
    // limpando o state
    setAuthToken("");
    // redirecionando para login
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ authToken, Register, Logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
