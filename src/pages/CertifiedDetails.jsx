import React, { useContext, useEffect, useState }  from 'react'
import AppContext from '../context/AppContext';
import ButtonAddCertified from '../components/ButtonAddCertified'
import Headers from '../components/Headers'
import 'bulma/css/bulma.css';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';

const SECRET_KEY = 'minhachavesecreta';

function CertifiedDetails({ match }) {
    const { 
      router,
      getLocalStorageUser,
      updateCertified,
      certifiedData,
      setCertifiedData,
      getCertifiedDetailsById,
      certifiedById,
    } = useContext(AppContext);
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
      updateCertified(match.params.id, userToken, fd)
    };

    useEffect(() => {
      if (!localStorage.getItem('user')) {
        return router.push('/');
      }
      const { token } = getLocalStorageUser();
  
      try {
        jwt.verify(token, SECRET_KEY);
      } catch (error) {
        localStorage.removeItem('user');
        router.push('/');
      }
      getCertifiedDetailsById(match.params.id, token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <div>
        <Headers logout />
        <form className="box App--Register-register-form">
          <div className="field">
          <h1 className="title is-4">Editar Certificado de Horas Complementares</h1>
            <div className="control">
              <div className="field">
                <img src={certifiedById && `http://localhost:3001/${certifiedById.certifiedImage}`} alt="certifiedImage" />
                <label className="label" htmlFor="file" >Imagem do Certificado</label>
                <div className={!certifiedById ? "control is-loading" : "control"}>
                  <input
                      type="file"
                      className="input is-link"
                      placeholder="Nome do Certificado"
                      id="file"
                      name="file"
                      onChange={fileSelectedHandle}
                    />
                  </div>
                </div>
              <div className="field">
                <label className="label" htmlFor="name">Nome do Certificado</label>
                <div className={!certifiedById ? "control is-loading" : "control"}>
                  <input
                    id="name"
                    name="name"
                    type="text" minLength={9}
                    className="input is-link"
                    placeholder="Nome do Certificado"
                    onChange={handleChange}
                    defaultValue={certifiedById && certifiedById.certifiedName}
                  />
                </div>
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
                  defaultValue={certifiedById && certifiedById.certifiedDescript}
                />
              </div>
              <div className="field" htmlFor="hours">
                <label className="label">Duração</label>
                <div className={!certifiedById ? "control is-loading" : "control"}>
                  <input
                    type="number" minLength={1}
                    className="input is-link"
                    placeholder="Duração(em horas)"
                    id="hours"
                    name="hours"
                    onChange={handleChange}
                    defaultValue={certifiedById && certifiedById.hours}
                  />
                </div>
              </div>
            </div>
          </div>
          <article class="message is-warning">
            <div class="message-body">
              <strong>Atenção!</strong>&ensp;
              ao atualizar seu certicado ele sera&ensp;
              <strong>reavaliado</strong> portanto,&ensp;
              o status entrada novamente em&ensp;
              <strong>Não-Homologado</strong>
            </div>
          </article>
          <div className="App--Update-register-buttons">
            <input
              type="submit"
              className="button is-info"
              onClick={(e) => ( sendData(e))}
            />
            <Link
              to={{ pathname: '/certified/' }}
            >
              <button
                className="button is-danger is-light"
              >
                Cancelar
              </button>
            </Link>
          </div>
        </form>
        <ButtonAddCertified />
      </div>
  )
}

export default CertifiedDetails
