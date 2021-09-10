import React,{useEffect,useContext,useState} from 'react';
import Img from './img1.jpg';
import {Card, Container,Row,Col } from 'react-bootstrap';
import { UserContext } from './Context';
import axios from 'axios';

export default function User() {
    let contextdata = useContext(UserContext);

    const [billarray, setBillarray] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            let res = await axios.get(`https://kp-onlinestore.herokuapp.com/bills/user/${contextdata.userData._id}`);
            console.log(res.data);
            setBillarray(res.data);
        }
        fetchData()
        
    },[contextdata.userData]);
    return (
        <>
            <div style={{backgroundColor:'#006039',height:"30vh"}}>
                <div className="jumbotron jumbotron-fluid" style={{padding:"100px 50px 0 0"}}>
                    <div className="container">
                        <h1 className="display-4 text-light">Hi {contextdata.userData.username}</h1>
                    </div>
                    <img src={Img} alt="user face" width="175px" style={{float:"right"}}/>
                </div>
            </div>
            {contextdata.userData.role==="Seller"?<Container style={{padding:"100px"}}>
               {billarray.map((e,index)=>{
                   return   <Row key={index}>
                                <Col xs={5}>
                                        <Card>
                                            <Card.Title>
                                                Bill {index+1}
                                            </Card.Title>
                                            <Card.Text>
                                            Rs. {e.totalValue}
                                            </Card.Text>
                                            <Card.Text>
                                             {e.billRecipient}
                                            </Card.Text>
                                            <Card.Text>
                                             {e.products.map((e,index)=>{
                                                 return <Card.Text key={index}>{e.name}</Card.Text>
                                             })}
                                            </Card.Text>
                                            
                                        </Card>
                                </Col>
                            </Row>
               })}
               </Container>:null}
            
        </>
    )
}
