import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button,Card} from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';

export default function UserRegister() {

    const [displayComponent, setdisplayComponent] = useState(false);
    const [messageDisplay, setmessageDisplay] = useState({display:"none",message:""});
    const [username, setusername] = useState('');
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [role, setrole] = useState('')

    const handleUsernameChange = (e)=>{
        setusername(e.target.value)
    }

    const handleEmailChange = (e)=>{
        setemail(e.target.value)
    }

    const handlePasswordChange = (e)=>{
        setpassword(e.target.value)
    }

    const handleCPasswordChange = (e)=>{
        setconfirmpassword(e.target.value)
    }
    
    const handleRoleChange = (e)=>{
        setrole(e.target.value)
    }

    let schema = yup.object().shape({
        username:yup.string().required('Required'),
        email: yup.string().email('Invalid email format').required("Required"),
        password: yup.string().required("Required"),
        confirmpassword: yup.string().required("Required").oneOf([yup.ref('password'),''],'passwords do not match')
      });

      const onSubmit = (e)=>{
        e.preventDefault()
        schema.validate({
                            username,
                            email,
                            password,
                            confirmpassword,
                            role
        }).then(async function (value) {
            let response = await axios({
                method:'post',
                url:'https://kp-onlinestore.herokuapp.com/users',
                data:{
                    username,
                    email,
                    password,
                    role
                }
            })
            if(response){
                setdisplayComponent(true);
            }
            
             
          }).catch(function (err) {
            setmessageDisplay({display:"block",message:err.errors});
          });  
      }
      if(!displayComponent){
            return (<div style={{display:'grid',placeItems:'center'}}>
            <Card style={{ width: '25rem',margin:"15px",padding:"0 7px 0 7px", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label><Card.Title>Username</Card.Title></Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange={handleUsernameChange}/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label><Card.Title>Email address</Card.Title></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Check type="radio" id='role' name='formBasicSRole' label='Seller account' value='Seller' onChange={ handleRoleChange }/>
                            <Form.Check type="radio" id='role' name='formBasicBRole' label='Buyer account'  value='Buyer'  onChange={ handleRoleChange }/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label><Card.Title> Password</Card.Title></Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label><Card.Title>Confirm Password</Card.Title></Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleCPasswordChange}/>
                        </Form.Group>
                        
                        <Button variant="primary" type="button" onClick={onSubmit}>
                            Submit
                        </Button>
                        <div style={{display:messageDisplay.display, color:"red"}}>{messageDisplay.message}</div>
                        <div>Already have an account?<Link to='/'>Login</Link></div>
                    </Form>
                </Card.Body>
            </Card>      
            </div>)
        }
        else{
            return ( <div style={{display:'grid',placeItems:'center'}}>
                        <Card style={{ width: '25rem',margin:"15px",padding:"0 7px 0 7px", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                            <Card.Body>
                                <Card.Title>
                                    Thank you for signing up
                                </Card.Title>
                                <Link to='/login' className="btn btn-primary"> 
                                Login
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
        
                )
        }
    
}
