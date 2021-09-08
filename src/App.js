import {useState} from 'react'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {UserContext} from './Components/Context';
import Topbar from './Components/Topbar';
import Login from './Components/Login';
import UserRegister from './Components/UserRegister';
import Home from './Components/Home';
import AddProduct from './Components/AddProduct';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState([])

  return (
          <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, userData, setUserData, productData, setProductData}}>
              <Router>
                <Topbar/>
                  <Switch>
                      <Route exact path="/">
                        {isLoggedIn ? <Home /> : <Login/>}
                      </Route>
                      <Route exact path="/addproduct">
                        <AddProduct/>
                      </Route>
                    <AddProduct/>
                  </Switch>
              </Router>
          </UserContext.Provider>
  );
}

export default App;
