import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../Providers/Auth/index";
import { useContext } from "react";

interface DataForm {
  email: string;
  password: string;
  name: string;
  age: number;
}

const Register = () => {
  const { Register } = useContext(AuthContext);

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
    name: yup.string().required("Nome Obrigatório"),
    age: yup.number().required("Idade Obrigatória"),
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
    Register(data);
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
            <input placeholder="Nome" {...register("name")} />
          </div>

          <div>
            <input placeholder="Idade" {...register("age")} />
          </div>

          <div>
            <button type="submit">Entrar</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
