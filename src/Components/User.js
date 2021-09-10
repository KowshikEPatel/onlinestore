import React,{useEffect,useContext} from 'react';
import Img from './img1.jpg';
import {Container} from 'react-bootstrap';
import { UserContext } from './Context';
import axios from 'axios';

export default function User() {
    let contextdata = useContext(UserContext);

    console.log(contextdata.userData.role)
    useEffect(async ()=>{

        let res = await axios.get(`https://kp-onlinestore.herokuapp.com/bills/user/${contextdata.userData._id}`)
        console.log(res);
        console.log(res.data);
    },[contextdata.userData])
    return (
        <>
            <div style={{backgroundColor:'#006039',height:"30vh"}}>
                <div className="jumbotron jumbotron-fluid" style={{padding:"100px 50px 0 0"}}>
                    <img src={Img} alt="user face" width="175px" style={{float:"right"}}/>
                </div>
            </div>
            <Container style={{padding:"100px"}}>
               
            </Container>
        </>
    )
}
