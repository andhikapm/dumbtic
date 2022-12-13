import React, {  useEffect, useState } from 'react';
import { Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import wishlistIcon from '../../assets/wishlist.png';
import wishlistWhite from '../../assets/wishlistWhite.png'
import { API } from '../../config/api';

export default function CardEvent(props) {
   const navigate = useNavigate();

   const [startState, setStartState] = useState(new Date())
  
   useEffect(() => {
      setStartState(new Date(props.startdate))
   }, []);

   const handlerWishlist = async(id, price) => {
      try {
         
         await API.patch('/addwishlist', {
            event_id: parseInt(id)
         })

      } catch (err) {
         console.log(err)
      }

   };

   return (
      <div className='col-4 p-4'>
               <Card 
                  className='position-relative border-0 py-0 bg-light rounded-0' 
                  style={{ width: '100%', backgroundColor : '#f4dcdc', borderColor: '#acacac', boxShadow: "0 2px 4px rgba(0, 0, 0, .3)" }} 
               >
                  <Card.Img onClick={() => navigate(`/detail-event/${props.id}`)} variant="top" src={props.image} style={{cursor: 'pointer'}}/>
                  <div 
                     className='position-absolute px-2 py-1 bg-light text-center rounded-1 fw-semibold' 
                     style={{width: "100px", right: "8px", top: "8px", color: "#ff5555", boxShadow: "0 2px 4px rgba(0, 0, 0, .6)"}}
                  >
                     {props.price}
                  </div>
                  <Card.Body className='position-relative flex align-items-center pt-2'>
                     <div className='d-flex pt-2'>
                        {props.title.length > 22 ? (
                           <h2 className='col-10 fs-4 fw-bold'>{props.title.slice(0,22)}...</h2>
                        ) : (
                           <h2 className='col-10 fs-4 fw-bold'>{props.title}</h2>
                        )}
                        <div className='col-2'></div>
                           <div className='position-absolute' style={{right: "18px", top: "14px", zIndex: "99"}}>
                              <img width="34px" src={wishlistIcon}
                                 onClick={() => handlerWishlist(props.id)}
                                 style={{cursor: 'pointer'}}
                              />
                           </div>
                     </div>
                     <p className='fs-5 fw-bold mb-1' style={{color: "#ff5555"}}>
                        {startState.toLocaleDateString('en-GB', {
                           day: 'numeric',
                           month: 'short',
                           year: 'numeric',
                        })}
                     </p>
                     <p className='fs-6 text-muted' style={{lineHeight: "1.2rem"}}>{props.description}</p>
                  </Card.Body>
               </Card>
            </div>
   );
}

