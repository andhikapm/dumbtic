import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from '../contexts/AppContext';
import { UserContext } from '../contexts/UserContext';
import CardEvent from '../components/LandingPage/CardEvent';
import { API } from '../config/api';
import { useQuery } from 'react-query';
import noEvents from '../assets/no-event.png';

const Category = () => {
   const {category} = useParams();
   const navigate = useNavigate();
   const contexts = useContext(AppContext);
   const [state,] = useContext(UserContext);

   //API.patch("/checkevent")

   let { data: eventC } = useQuery("categoryCache", async () => {
      const response = await API.get('/categoryevent/' + category)
      //console.log("berhasil ambil detail", response)
      return response.data.data
   })

   return (
      
       <Container className='row mx-auto pb-5 px-0 mb-4' style={{marginTop: "180px"}}>
         <h1 className='fw-bolder px-4 pb-4' style={{color: "#ff5555"}}>{category[0].toUpperCase() + category.substring(1)}</h1>
      {state.isLogin ?(
        <>
            {eventC?.length === undefined ? (
               <div className='text-center'>
                  <img src={noEvents} width="50%"/>
               </div>
            ) : (
               <>
                  {eventC?.map((item, index) => (
                     <CardEvent key={index} id={item.id} title={item.title} description={item.description} image={item.image} startdate ={item.startdate} price={item.price}/>
                  ))}
               </>
            )}
         </>
      ):(
         <>
            {eventC?.length === undefined ? (
               <div className='text-center'>
                  <img src={noEvents} width="50%"/>
               </div>
            ) : (
               <>
                  {eventC?.map((item, index) => (
                     <CardEvent key={index} id={item.id} title={item.title} description={item.description} image={item.image} startdate ={item.startdate} price={item.price}/>
                  ))}
               </>
            )}
         </>
      )

      }
      
      </Container>
      
   );
}

export default Category;

