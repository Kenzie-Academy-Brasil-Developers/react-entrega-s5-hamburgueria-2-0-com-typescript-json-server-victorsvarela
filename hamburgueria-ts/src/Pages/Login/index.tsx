import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../Providers/Auth/index";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import "./style.css";
import "../../GlobalStyle/main.css";

interface DataForm {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const history = useHistory();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email obrigatório")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Endereço de email inválido"
      ),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Senha deve conter: Pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial e pelo menos 8 dígitos"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    resolver: yupResolver(loginSchema),
  });

  const handleClick = (data: DataForm) => {
    console.log(data);
    signIn(data);
  };

  const btnRegister = () => {
    history.push("/register");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleClick)}>
        <div>
          <div>
            <input placeholder="Email" {...register("email")} />
          </div>

          <div>
            <input
              placeholder="Senha"
              {...register("password")}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Entrar</button>
          </div>
        </div>
        <div>
          <p className="paragraph_crie_sua-conta">
            Crie sua conta para saborear muitas delícias e matar sua fome!
          </p>
        </div>
        <div>
          <button
            className="btn_login_for_register"
            onClick={() => btnRegister()}
          >
            Registre-se
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
