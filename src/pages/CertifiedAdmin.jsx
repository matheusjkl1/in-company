import React, { useEffect, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken';
import AppContext from '../context/AppContext';
import Headers from '../components/Headers';
import 'bulma/css/bulma.css';
import Loading from '../components/Loading';

const SECRET_KEY = 'minhachavesecreta';

function CertifiedAdmin() {
  const { router, getLocalStorageUser, getAllCertified, certified, loading, updateCertifiedStatus } = useContext(AppContext);
  const [userToken, setToken] = useState()
  const [listView, setListView] = useState("Não-Homologado")

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      return router.push('/');
    }
    const { token, role } = getLocalStorageUser();
    if (role === 'user') {
      localStorage.removeItem('user');
      router.push('/');
    }
    setToken(token)
    try {
      jwt.verify(token, SECRET_KEY);
    } catch (error) {
      localStorage.removeItem('user');
      router.push('/');
    }
    getAllCertified(token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendData = async (e, id, status) => {
    e.preventDefault()
    if (status === 'Não-Homologado'){ 
      const changeStatus = 'Homologado'
      updateCertifiedStatus(id, userToken, changeStatus)
      window.location.reload();
    } else {
      const changeStatus = 'Não-Homologado'
      updateCertifiedStatus(id, userToken, changeStatus)
      window.location.reload();
    }
  };

  return (
    <div>
      <Headers logout />
      <div className="App--Certified box">
        <button className="button" onClick={() => setListView("Não-Homologado")}>Visualizar Não-Homologados</button>
        <button className="button" onClick={() => setListView("Homologado")}>Visualizar Homologado</button>
      </div>
      <div className="App--Certified box">
          {loading ? <Loading /> : certified.filter(({status}) => status === listView).map(({
             id,
             registrationNumber,
             certifiedImage,
             certifiedName,
             certifiedDescript,
             hours, 
             status 
          }) => (
             <div className="card App--Certified-List" key={uuidv4()}>
                <div className="card-header">
                  <p className="card-header-title">
                    ID do Certificado: {id}
                  </p>
                </div>
                  <div className="card-image App--Certified-image-div">
                    <figure className="image is-4by3 App--Certified-image ">
                      <img src={`http://localhost:3001/${certifiedImage}`} alt="Placeholder" />
                    </figure>
                </div>
              <div className="card-content">
                <div className="content">
                  <p>N° da Matricula do Aluno: {registrationNumber}</p>
                  <p>Nome do Cerfificado: {certifiedName}</p>
                  <div>Status: 
                    <div className={
                      status === "Não-Homologado" ? "App--Certified-Status message is-warning" : "App--Certified-Status message is-success"
                    }>
                      <strong className={status === "Não-Homologado" ? "message is-warning" : "message is-success" }>
                        {status}
                      </strong>
                    </div>
                  </div>
                  <br/>
                  Descrição:
                  <br/>
                  {certifiedDescript}
                  <br/>
                  Duração do curso: <strong>{hours} Horas </strong>
                </div>
                <div className="card-footer">
                  <button
                    className={
                      status === "Não-Homologado" ? "card-footer-item button is-success is-light" :
                      "card-footer-item button is-warning is-light"
                    }
                    onClick={(e) => ( sendData(e, id, status))}
                  >
                    {status === "Não-Homologado" ? "Homologar" : "Remover Homologação"}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!certified.length && (
            <div className="App--Certified-Not-Found">
              Não a certicados para serem homologados
            </div>
          )}
      </div>
    </div>
  )
} 

export default CertifiedAdmin
