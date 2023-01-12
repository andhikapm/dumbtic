import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContext';
import { UserContext } from '../../contexts/UserContext';
import {Today} from '../../data/DataToday';
import CardEvent from '../LandingPage/CardEvent';

const Favorite = (props) => {
   const contexts = useContext(AppContext);
   const [state,] = useContext(UserContext);

   return (
      <Container className='row mx-auto pb-5 px-0 mb-4' style={{marginTop: "60px"}}>
         <h1 className='fw-bolder px-4 pb-4' style={{color: "#ff5555"}}>Favorite</h1>
         {contexts.profileUser?.event.map((item, index) => (
            <CardEvent 
               key={index} 
               id={item.id} 
               title={item.title} 
               description={item.description} 
               image={item.image} 
               startdate ={item.startdate}
               enddate = {item.enddate}
               address = {item.address}
               urlmap = {item.urlmap}
               category = {item.category}
               email = {item.email}
               phone = {item.phone}
               price ={item.price}
               status = {item.status}/>
         ))}
      </Container>
   );
}

export default Favorite;

