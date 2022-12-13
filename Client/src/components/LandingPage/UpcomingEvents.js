import React, { useContext} from 'react';
import { Container } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContext';
import { UserContext } from '../../contexts/UserContext';
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import CardEvent from './CardEvent';

const Upcoming = () => {
   const contexts = useContext(AppContext);
   const [state,] = useContext(UserContext);

   let { data : events } = useQuery("upcomingCaches", async () => {
      const response = await API.get('/upcomingevent')
      //console.log("berhasil ambil data", response.data.data)
      return response.data.data
  })

   return (
      <Container className='row justify-content-between m-auto pb-5 px-0 mb-4'>
         <h1 className='fw-bolder px-4 pb-4' style={{color: "#ff5555"}}>Upcoming Events</h1>
         {events?.map((item, index) => 
            <CardEvent key={index} id={item.id} title={item.title} description={item.description} image={item.image} startdate ={item.startdate} price={item.price}/>
         )}
      </Container>
   );
}

export default Upcoming;

