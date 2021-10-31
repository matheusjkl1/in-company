import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import headerImg from '../public/group.png'

function Headers({ logout }) {
  const { router, getLocalStorageUser, user, setUser } = useContext(AppContext);

  useEffect(() => {
   if (getLocalStorageUser()) {
     setUser(getLocalStorageUser().name)
   };
  }, [getLocalStorageUser, setUser])

  const logoutFunc = () => {
    localStorage.removeItem('user');
    router.push('/');
  }

  return (
    <header className="App-header">
      <img src={headerImg} alt="group" className="App-header-Img"/>
      <Link
        to={{ pathname:'/certified' }}
      >
        <p>Grupo Tiradentes</p>
      </Link>
      <div>
      </div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="App-header-navbar-menu navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <p className="navbar-link">
                {user}
              </p>
              <div className="navbar-dropdown">
                <hr className="navbar-divider"/>
                <a className="navbar-item" href="/certified">
                  Meus Certificados
                </a>
                <a className="navbar-item" href="/suporte">
                  Ajuda e Suporte
                </a>
                { logout && 
                <a
                  className="navbar-item"
                  onClick={() => logoutFunc() }
                  href="/"
                >
                  Sair
                </a>}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Headers
