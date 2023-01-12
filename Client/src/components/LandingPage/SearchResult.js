import React from 'react';
import { Container } from 'react-bootstrap';
import noEvents from '../../assets/no-event.png';
import CardEvent from './CardEvent';

const SearchResult = ({searchData}) => {

   return (
      <Container className='row m-auto pb-5 px-0 mb-4'>
         {searchData?.length === 0 ? (
            <div className='text-center'>
               <img src={noEvents} width="50%"/>
            </div>
         ) : (
            <>
               {searchData?.map((item, index) => (
                  <CardEvent key={index} id={item.id} title={item.title} description={item.description} image={item.image} startdate ={item.startdate} price={item.price}/>
               ))}
            </>
         )}
      </Container>
   );
}

export default SearchResult;

