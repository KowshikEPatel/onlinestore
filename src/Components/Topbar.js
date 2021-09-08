import React,{useContext} from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap';
import {UserContext} from './Context'

export default function Topbar() {
    let context = useContext(UserContext);
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand style={{fontSize:"2.5rem",fontWeight:"550"}}>Superstore</Navbar.Brand>
                       {context.isLoggedIn && <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>} 
                </Container>
            </Navbar> 
        </>
    )
}
