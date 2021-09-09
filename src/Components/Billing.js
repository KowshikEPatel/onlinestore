import React,{useState,useContext} from 'react';
import {Container,Card,Form,Col,Table,Row,Button,InputGroup,FormControl} from 'react-bootstrap';
import { UserContext } from './Context';
import axios from 'axios';

export default function Billing() {
    const [address,setAddress]=useState("");
    const [search,setSearch] = useState("");
    const [searchList,setSearchList] = useState([]);
    const [selectItem,setSelectItem] = useState({});
    const [quantity,setQuantity] = useState(0);
    const [cart,setCart]= useState([]);
    const [description,setDescription] = useState("");
    const [message,setMessage] = useState({display:"none",message:""});
    const context = useContext(UserContext);

    const handleAddressChange = (e)=>{
        e.preventDefault();
        setAddress(e.target.value);
    }

    const handleSearch = (e)=>{
        setSearch(e.target.value);
    }

    const getSearch = async (e)=>{

        e.preventDefault();
        let response = await axios.get("https://kp-onlinestore.herokuapp.com/products/key?search="+search.toLowerCase());
        setSearchList(response.data);
    }
    
    const addToCart = (e)=>{
        e.preventDefault();
        setCart([...cart,{"product":selectItem,"quantity":quantity}]);
        setSelectItem({});
        setQuantity(0)
    }

    const selectProduct =  (obj)=>{
        setSelectItem(obj);
    }
    
    const handleQuantity = (e)=>{
        setQuantity(e.target.value)
    }

    const handleDescriptionChange = (e)=>{
        setDescription(e.target.value)
    }

    const onSubmit = async()=>{

        let totalValue = cart.map(e=>parseInt(e["quantity"])*e["product"]["price"]).reduce((sum,e)=>sum+e);
        let billdata = {
            "generatedBy":context.userData["_id"],
            "billRecipient":address,
            description,
            "products":cart.map(e=>e["product"]["_id"]),
            "productsqty":cart.map(e=>e["quantity"]),
            "totalValue":totalValue,
        }
        let res = await axios.post("https://kp-onlinestore.herokuapp.com/bills",billdata);
        if(res){
            setMessage({display:"block",message:`Bill generated`});
            setAddress("");
            setSearch("");
            setSearchList([]);
            setQuantity(0);
            setCart([]);
        }
    }

    return (
        <>
           <Container>
                <Card className="border-light m-3" style={{ width: '50rem'}}>
                    <h3 style={{display:message.display,color:"green"}}>{message.message}</h3>
                    <Form>
                        <Form.Group  className="mb-3" controlId="formAddress">
                            <Form.Label><Card.Title>Address</Card.Title></Form.Label>
                            <Col xs={3}><Form.Control as="textarea" aria-label="Address" placeholder="Enter Address" onChange={handleAddressChange} row={4} value={address} /></Col>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formProductName">
                                <Form.Label><Card.Title>Add products</Card.Title></Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder="Product search"
                                    aria-label="Product search"
                                    aria-describedby="basic-addon2"
                                    onChange={handleSearch}
                                    
                                    />
                                    <InputGroup.Text id="basic-addon2" onClick={getSearch} ><i className="fas fa-search"></i></InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formQuantity">
                                <Form.Label><Card.Title>Quantity</Card.Title></Form.Label>
                                <Form.Control type="text" placeholder="Enter product quantity" onChange={handleQuantity} value={quantity}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formAddButton">
                                <Button onClick={addToCart}><i className="fas fa-plus"></i></Button>
                            </Form.Group>
                        </Row>
                        <div>
                            {searchList.map((e,index)=>{
                                let srcvar = "https://kp-onlinestore.herokuapp.com/image/"+e.photo;

                                return <div key={index}>
                                            <Card style={{ width: '15rem'}} >
                                                <Card.Img src={srcvar}  alt="product image" height="125px"/>
                                                <Card.Title>{e.name}</Card.Title>
                                                <Button onClick={()=>{selectProduct(e)}}><i className="fas fa-check"></i></Button>
                                            </Card>
                                        </div > 
                            })}
                        </div>
                        
                        <Form.Group  className="mb-3" controlId="formDescription">
                            <Form.Label><Card.Title>Bill Description</Card.Title></Form.Label>
                            <Form.Control as="textarea" aria-label="BillAddress" placeholder="Enter Bill description" onChange={handleDescriptionChange} row={4} />
                        </Form.Group>
                        <Button className="mb-2" onClick={onSubmit}>Submit bill</Button>
                    </Form>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price </th>
                                <th>Total cost </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((e,index)=>{
                                return <tr>
                                    <td>{index+1}</td>
                                    <td>{e.product.name}</td>
                                    <td>{e.quantity}</td>
                                    <td>{e.product.price}</td>
                                    <td>{parseInt(e.product.price)*parseInt(e.quantity)}</td>
                                    </tr>
                            })}
                            <tr>

                            </tr>
                        </tbody>
                    </Table>

                </Card> 
            </Container>
        </>
    )
}
