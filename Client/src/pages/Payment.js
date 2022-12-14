import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import { AppContext } from '../contexts/AppContext';
import { UserContext } from '../contexts/UserContext';
import { API } from '../config/api';
import { useQuery } from 'react-query';
import TicketPayment from '../components/Payment/TicketPay';

const Payment = () => {
   const contexts = useContext(AppContext);
   const [state,] = useContext(UserContext);

   //API.patch("/checkevent")
   
   let { data: ticketU } = useQuery("payticketCache", async () => {
      const response = await API.get('/payticket')
      //console.log("berhasil ambil detail", response.data.data)
      return response.data.data
   })

   //console.log(ticketU)

   return (
      <>
         <Container className='justify-content-between m-auto pb-5 px-4 mb-4' 
            style={{padding : "200px 24px 0"}}
         >
            <h1 className='fw-bolder pb-5' style={{color: "#ff5555"}}>Payment</h1>
            <div className='d-flex'>
               <div className='col-6 fs-4 fw-semibold py-3 text-center text-light' style={{backgroundColor: "#ff5555"}}>Payment</div>
            </div>
            <div className='bg-light' style={{borderTop: "8px solid #ff5555", padding: "80px 120px 20px"}}>
               {ticketU?.map((item, index) => (
                  <TicketPayment key={index} id={item.id} qty={item.qty} event={item.event} status={item.status}/>
               ))}
            </div>
         </Container>

         <Footer/>
      </>
   );
}

export default Payment;

