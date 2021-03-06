import React,{useState,useContext} from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './Context';
import Loader from './Loader';

export default function Login() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [messageDisplay, setmessageDisplay] = useState({display:"none",message:""});
    const usercontext = useContext(UserContext)

    const handleEmailChange = (e)=>{
        setemail(e.target.value)
    }

    const handlePasswordChange = (e)=>{
        setpassword(e.target.value)
    }

    const handleLogin = async (e)=>{
        usercontext.setisLoading(true);
        e.preventDefault()
        let response = await axios({
            method:'post',
            url:'https://kp-onlinestore.herokuapp.com/users/login',
            data:{
                email,
                password,
            }
        })
        let responseProducts = await axios('https://kp-onlinestore.herokuapp.com/products/all/1');
        if(!response.data.errorMessage){
            
            usercontext.setUserData(response.data);
            usercontext.setProductData(responseProducts.data);
            usercontext.setIsLoggedIn(true);
            usercontext.setisLoading(false);
        }
        else{
            setmessageDisplay({display:"block",message:response.data.errorMessage});
            usercontext.setisLoading(false);
        }
        
    }
    
    const handleLoginTestBuyer = async (e)=>{
        usercontext.setisLoading(true);
        e.preventDefault();
        let response = await axios({
            method:'post',
            url:'https://kp-onlinestore.herokuapp.com/users/login',
            data:{
                email:'kowshikerappajipatel@gmail.com',
                password:'12345',
            }
        })
        let responseProducts = await axios('https://kp-onlinestore.herokuapp.com/products/all/1');
        setemail('');
        setpassword('');
        usercontext.setUserData(response.data);
        usercontext.setProductData(responseProducts.data);
        usercontext.setIsLoggedIn(true);
        usercontext.setisLoading(false);
    }

    const handleLoginTestSeller = async (e)=>{
        usercontext.setisLoading(true);
        e.preventDefault();
        let response = await axios({
            method:'post',
            url:'https://kp-onlinestore.herokuapp.com/users/login',
            data:{
                email:'User2@gmail.com',
                password:'12345',
            }
        })
        let responseProducts = await axios('https://kp-onlinestore.herokuapp.com/products/all/1');
        setemail('');
        setpassword('');
        if(!response.data.errorMessage){
            usercontext.setUserData(response.data);
            usercontext.setProductData(responseProducts.data);
            usercontext.setIsLoggedIn(true);
            usercontext.setisLoading(false);
        }
        else{
            
            setmessageDisplay({display:"block",message:response.data.errorMessage});
            usercontext.setisLoading(false);
        }
    }
    if(usercontext.isLoading){
        return <Loader/>
    }
    else{
        return (
            <Row style={{height:'95vh'}}>
                <Col xs={4}  className="bg-success text-light" style={{display:'grid',placeItems:"center"}}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label> Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                        </Form.Group>
                            <Button className="btn btn-light mb-2" onClick={handleLogin}>Login </Button>
                        <div>
                            <Button className="btn btn-light mt-1" onClick={handleLoginTestSeller}>Login with test Seller credentials </Button>
                        </div>
                        <div>
                            <Button className="btn btn-light mt-1" onClick={handleLoginTestBuyer}>Login with test Buyer credentials </Button>
                        </div>
                        
                        
                        <div style={{display:messageDisplay.display, color:"red"}}>{messageDisplay.message}</div>
                            <div>Do not have an account?<Link to='/userregistration' className="btn btn-link text-light">Register</Link></div>
                    </Form>
                </Col>
                <Col xs={8} style={{backgroundImage:"url(https://images.pexels.com/photos/331990/pexels-photo-331990.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)"}}>
                    
                </Col>
    
            </Row>
        )
    }
    
}
