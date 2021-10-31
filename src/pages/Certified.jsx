import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken';
import AppContext from '../context/AppContext';
import Headers from '../components/Headers';
import 'bulma/css/bulma.css';
import Loading from '../components/Loading';
import ButtonAddCertified from '../components/ButtonAddCertified';

const SECRET_KEY = 'minhachavesecreta';

function Certified() {
  const { router, getLocalStorageUser, getCertifiedByNumberRegister, certified, loading, deleteCertified } = useContext(AppContext);
  const [userToken, setToken] = useState()

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
    getCertifiedByNumberRegister(token)
    setToken(token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sumHours = () => {
    const accHours = certified.filter(({status}) => status === "Homologado" )
    if (accHours.length) {
      const sum = accHours.reduce((prev, curr) => parseInt(prev.hours) + parseInt(curr.hours))
      if (accHours.length === 1) {
        return sum.hours
      } else {
        return sum
      }
    }

    return 0
  }

  const callFunc = async (id) => {
    deleteCertified(id, userToken)
    window.location.reload();
  }

  return (
    <div>
      <Headers logout />
      <div className="box">
        <div class="message-body">
          Horas Extra-curriculares até o momento: <strong>{certified.length && sumHours()}h</strong>
        </div>
      </div>
      <div className="App--Certified box">
        {loading ? <Loading /> : certified.map(({ id, certifiedImage, certifiedName, certifiedDescript, hours, status }) => (
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
                <strong>{hours} Horas </strong>
              </div>
              <div className="card-footer">
                <Link
                  to={{
                    pathname: `/certified/${id}`,
                  }}
                >
                  <button className="card-footer-item button is-link is-light">Editar</button>
                </Link>
                <button className="card-footer-item button is-danger is-light" onClick={() => callFunc(id)} >Deletar</button>
              </div>
            </div>
          </div>
        ))}
          {!certified.length && (
          <div className="App--Certified-Not-Found">
            Voce nao possui certificado de horas complementares
          </div>
          )}
          <ButtonAddCertified />
      </div>
    </div>
  )
}

export default Certified
