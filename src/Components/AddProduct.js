import React,{useState,useContext} from 'react';
import { Container,Form,Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { UserContext } from './Context';
import axios from 'axios';

export default function AddProduct() {

    const contextdata = useContext(UserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [features, setFeatures] = useState('');
    const [file, setFile] = useState(null);
    
    const handleNameChange = (e)=>{
        setName(e.target.value)
    }

    const handleDescriptionChange = (e)=>{
        setDescription(e.target.value)
    }

    const handlePriceChange = (e)=>{
        setPrice(e.target.value)
    }

    const handleStockChange = (e)=>{
        setStock(e.target.value)
    }

    const handleFeaturesChange = (e)=>{
        setFeatures(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(name.toLowerCase());
        
        const productdata = {
            name,
            smallcase:name.toLowerCase(),
            description,
            price,
            stock,
            features:features.split(','),
        }
        if(file){
            const data = new FormData();
            data.append('name',file.name);
            data.append('file',file);
            try{
                let res = await axios.post("https://kp-onlinestore.herokuapp.com/upload",data);
                productdata.photo = res.data["filename"];
                productdata.seller = contextdata.userData._id;
            }
            catch(err){
                console.log(err)
            }
            
        }
        try{
            
            const res = await axios.post("https://kp-onlinestore.herokuapp.com/products",productdata)
            if(res){
                window.location.replace("/");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <Container>
            <Card className="border-light m-3" style={{ width: '40rem'}}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label><Card.Title>Name</Card.Title></Form.Label>
                        <Form.Control type="text" placeholder="Enter Product Name" onChange={handleNameChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label><Card.Title>Description</Card.Title></Form.Label>
                        <Form.Control as="textarea" aria-label="Description" placeholder="Enter Description" onChange={handleDescriptionChange}/>
                    </Form.Group>
                    <input className="mb-3" type="file" onChange={(e)=>setFile(e.target.files[0])}/>
                    <img className="mb-3" style={{display:file?'block':"none",height:'200px',width:"200px"}} src={file?URL.createObjectURL(file):null} alt="product_image"/>
                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label><Card.Title>Price (per unit)</Card.Title></Form.Label>
                        <Form.Control type="text" placeholder="Enter Price" onChange={handlePriceChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicStock">
                        <Form.Label><Card.Title>Stock</Card.Title></Form.Label>
                        <Form.Control type="text" placeholder="Enter Stock" onChange={handleStockChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFeatures">
                        <Form.Label><Card.Title>Features (enter multple separated by ,)</Card.Title></Form.Label>
                        <Form.Control type="text" placeholder="Enter Features" onChange={handleFeaturesChange}/>
                    </Form.Group>

                    <Link className="btn btn-primary" to="/home" onClick={handleSubmit}>Submit</Link>
                </Form>
            </Card>
        </Container>
    )
}
