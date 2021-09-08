import React,{useContext,useState} from 'react';
import { Container,InputGroup,FormControl,Row,Col,Card, ListGroup } from 'react-bootstrap';
import { UserContext } from './Context';
import axios from 'axios';


export default function Home() {
    let contextdata = useContext(UserContext);
    let productarray = contextdata.productData
    
    const [search, setSearch] = useState("");

    const handleSearch = (e)=>{
        setSearch(e.target.value);
    }

    const getSearch = async (e)=>{

        e.preventDefault();
        let response = await axios.get("http://localhost:8000/products/key?search="+search.toLowerCase());
        console.log(response);
    }

    return (<>
            <div style={{backgroundColor:'#d6ffd2'}} >
                <div className="jumbotron jumbotron-fluid pb-3">
                    <div className="container">
                        <h1 className="display-4">SuperStore</h1>
                        <p className="lead">Your search for food ends here.</p>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Product search"
                            aria-label="Product search"
                            aria-describedby="basic-addon2"
                            onChange={handleSearch}
                            />
                            <InputGroup.Text id="basic-addon2" onClick={getSearch}><i className="fas fa-search"></i></InputGroup.Text>
                        </InputGroup>
                    </div>
                </div> 
            </div>
            <Container>
                <Row>
                    {
                        productarray.map((e,index)=>{
                            let srcvar = "https://kp-onlinestore.herokuapp.com/image/"+e.photo;
                            return <Col xs={3} className="m-2" key={index}>
                                        <Card className="border-light">
                                            <Card.Img variant="top" src={srcvar} alt="product image" height="200px"/>
                                            <Card.Title>{e.name}   <span style={{fontWeight:"500"}}>Rs.{e.price}</span></Card.Title>
                                            <Card.Text>{e.description}</Card.Text>
                                            <ListGroup>
                                            {e.features.map((ele,index)=>{
                                                return <ListGroup.Item key={index}>{ele}</ListGroup.Item>
                                            })}
                                            </ListGroup>
                                        </Card>
                                    </Col>
                        })
                    }
                </Row>
            </Container>
            </>
        
    )
}
