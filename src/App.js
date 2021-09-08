import {useState} from 'react'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {UserContext} from './Components/Context';
import Topbar from './Components/Topbar';
import Login from './Components/Login';
import UserRegister from './Components/UserRegister';
import Home from './Components/Home';
import AddProduct from './Components/AddProduct';
import Billing from './Components/Billing';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  return (
          <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, userData, setUserData, productData, setProductData,isLoading, setisLoading}}>
              <Router>
                <Topbar/>
                  <Switch>
                      <Route exact path="/">
                        {isLoggedIn ? <Home /> : <Login/>}
                      </Route>
                      <Route exact path="/addproduct">
                        <AddProduct/>
                      </Route>
                      <Route exact path="/billing">
                        <Billing/>
                      </Route>
                      <Route exact path="/userregistration">
                        <UserRegister/>
                      </Route>                    
                  </Switch>
              </Router>
          </UserContext.Provider>
  );
}

export default App;
