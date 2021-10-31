import React, { useContext, useEffect, useState }  from 'react'
import AppContext from '../context/AppContext';
import Headers from '../components/Headers'
import 'bulma/css/bulma.css';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'minhachavesecreta';

function RegisterCertified() {
  const { router, getLocalStorageUser, registerCertified, certifiedData, setCertifiedData } = useContext(AppContext);
  const [userToken, setToken] = useState()


  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCertifiedData({ ...certifiedData, [name]: value });
  };

  const fileSelectedHandle = ({ target }) => {
    const { name, files } = target;
    setCertifiedData({ ...certifiedData, [name]: files[0] });
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      return router.push('/');
    }
    const { token } = getLocalStorageUser();
    setToken(token)
    try {
      jwt.verify(token, SECRET_KEY);
    } catch (error) {
      localStorage.removeItem('user');
      router.push('/');
    }
  }, [getLocalStorageUser, router, userToken]);

  const sendData = async (e) => {
    e.preventDefault()
    const fd = new FormData();
    fd.append('name', certifiedData.name);
    fd.append('file', certifiedData.file);
    fd.append('descript', certifiedData.descript);
    fd.append('hours', certifiedData.hours);
    registerCertified(fd, userToken)
  };

  return (
    <div>
      <Headers logout />
      <div className="App--Register-register-div">
        <form className="box App--Register-register-form">
          <div className="field">
          <h1 className="title is-4">Cadastrar Certificado de Horas Complementares</h1>
            <div className="control">
              <div className="field">
                <label className="label" htmlFor="file" >Imagem do Certificado</label>
                <input
                    type="file"
                    className="input is-link"
                    placeholder="Nome do Certificado"
                    id="file"
                    name="file"
                    onChange={fileSelectedHandle}
                  />
                </div>
              <div className="field">
                <label className="label" htmlFor="name">Nome do Certificado</label>
                <input
                  id="name"
                  name="name"
                  type="text" minLength={9}
                  className="input is-link"
                  placeholder="Nome do Certificado"
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="descript">Descrição</label>
                <textarea
                  type="text" minLength={15}
                  className="textarea is-link"
                  placeholder="Descrição do Certificado"
                  id="descript"
                  name="descript"
                  onChange={handleChange}
                />
              </div>
              <div className="field" htmlFor="hours">
                <label className="label">Duração</label>
                <input
                  type="number" minLength={1}
                  className="input is-link"
                  placeholder="Duração(em horas)"
                  id="hours"
                  name="hours"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <input
            type="submit"
            className="button is-info"
            onClick={(e) => ( sendData(e))}
          />
        </form>
      </div>
    </div>
  )
}

export default RegisterCertified
