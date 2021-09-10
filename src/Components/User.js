import React,{useEffect,useContext,useState} from 'react';
import Img from './img1.jpg';
import {Card, Container,Row,Col} from 'react-bootstrap';
import { UserContext } from './Context';
import axios from 'axios';

export default function User() {
    let contextdata = useContext(UserContext);

    const [billarray, setBillarray] = useState([]);
    const [show, setShow] = useState({showvar:"none",shownum:-1});

    const handleClose = () => setShow({showvar:"none",shownum:-1});
    const handleShow = (number) => setShow({showvar:"block",shownum:number});

    
    useEffect(()=>{
        async function fetchData(){
            let res = await axios.get(`https://kp-onlinestore.herokuapp.com/bills/user/${contextdata.userData._id}`);
            setBillarray(res.data);
        }
        fetchData()
        
    },[contextdata.userData]);
    return (
        <>
            <div style={{backgroundColor:'#006039',height:"30vh"}}>
                <div className="jumbotron jumbotron-fluid" style={{padding:"100px 50px 0 0"}}>
                    <img src={Img} alt="user face" width="175px" style={{float:"right"}}/>
                </div>
            </div>
            {contextdata.userData.role==="Seller"?<Container style={{padding:"100px"}}>
               {billarray.map((e,index)=>{
                   return   <Row key={index} onClick={()=>{handleShow(index)}} >
                                <Col xs={5}>
                                        <Card>
                                            <Card.Title>
                                                Bill {index+1}
                                            </Card.Title>
                                            <Card.Text>
                                            Rs. {e.totalValue}
                                            </Card.Text>
                                        </Card>
                                </Col>
                            </Row>
               })}
               <Row style={{display:show.showvar}}>
                    <Col>
                        <Card>
                            <Card.Title>Bill {show.shownum+1}</Card.Title>
                            <Card.Text>{JSON.parse(billarray)}</Card.Text>
                            <Button onClick={handleClose}>click</Button>
                        </Card>
                    </Col>
               </Row>
               </Container>:null}
            
        </>
    )
}
