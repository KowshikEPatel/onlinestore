import React,{useContext} from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {UserContext} from './Context'

export default function Topbar() {
    let context = useContext(UserContext);

    const handleLogout = ()=>{
        context.setUserData({})
        context.setProductData({})
        context.setIsLoggedIn(false)
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand style={{fontSize:"2.5rem",fontWeight:"550"}}>SuperStore</Navbar.Brand>
                       {context.isLoggedIn && <Nav className="me-auto">
                        <Link className="btn text-light fs-5" to="/"> Home</Link>
                        {context.userData.role==="Buyer" && <Link className="btn text-light fs-5">User</Link> }
                        {context.userData.role==="Seller" && <Link className="btn text-light fs-5" to="/addproduct">Add Product</Link>}
                        {context.userData.role==="Seller" && <Link className="btn text-light fs-5" to="/billing">Billing</Link> }
                        <Link className="btn btn-dark text-light fs-5" onClick={handleLogout} to="/">Logout</Link>
                        </Nav>} 
                </Container>
            </Navbar> 
        </>
    )
}
