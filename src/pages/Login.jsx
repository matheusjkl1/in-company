import React, { useContext }  from 'react'
import { useForm } from "react-hook-form";
import AppContext from '../context/AppContext';
import 'bulma/css/bulma.css';

function Login() {
  const { signIn, notFound } = useContext(AppContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => signIn(data);

  return (
      <div className="App">
        <div className="App--Login">
          <form className="box App--Login-login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
            <label className="label">Número da Matrícula:</label>
              <div className="control">
                <input
                  {...register("registrationNumber", { required: true, maxLength: 9, minLength: 9 })}
                  type="text" maxLength={9}
                  className={errors.registrationNumber?.type === 'required' ? "input is-danger" :"input is-link"}
                  placeholder="56345518"
                />
              </div>
            </div>
            <div className="field">
            <label className="label">Senha:</label>
              <div className="control">
                <input {...register("password", { required: true, minLength: 8 })}
                  type="password"
                  className={errors.password?.type === 'required' ? "input is-danger" :"input is-link"}
                  placeholder="********"
                />
              </div>
            </div>
            <input
              type="submit"
              className="button is-info"
            />
          {notFound && 
            <article className="message is-danger">
              <div className="message-body">
                <strong>Usuario ou senha incorretos</strong>
              </div>
            </article>
          }
          </form>
        <div className="App-header-example ">
          Usuarios Cadastrados
          <strong><p>User</p></strong>
          Número da Matrícula:<br/>
          12345789<br/>
          Senha:<br/>
          123456789
          <strong><p>Admin</p></strong>
          Número da Matrícula:<br/>
          12345789<br/>
          Senha:<br/>
          123456789
        </div>
        </div>
      </div>
  )
}

export default Login
