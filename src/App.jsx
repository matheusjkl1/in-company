import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Certified from './pages/Certified';
import './App.css';
import CertifiedDetails from './pages/CertifiedDetails';
import RegisterCertified from './pages/RegisterCertified';
import CertifiedAdmin from './pages/CertifiedAdmin';

function App() {
  return (
       <Switch>
       <Route exact path="/">
         <Redirect to="/login" />
       </Route>
       <Route path="/login" component={ Login } />
       <Route exact path="/admin/certified" component={ CertifiedAdmin } />
       <Route exact path="/certified/register" component={ RegisterCertified } />
       <Route exact path="/certified/:id" component={ CertifiedDetails } />
       <Route exact path="/certified" component={ Certified } />
       <Route component={ NotFound } />
     </Switch>
  );
}

export default App;
