import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { AppContext } from '../contexts/AppContext';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export default function LoadingPage() {
   const contexts = useContext(AppContext)

   return (
    <>
      <Modal show={contexts.showLoading} onHide={() =>contexts.setLoading(false)} centered>
         {/*<Modal.Body className='rounded-0 px-5' style={{backgroundColor: "#f4e1e1"}}>
            <Modal.Title className="my-4 fw-bolder fs-1 text-center" style={{color: "#484646"}}>LOADING</Modal.Title>
            <div className="spinner-box">      
                <Spinner animation="border" size="sm" />
                <Spinner animation="border" />
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" />
                <span>Loading...</span>
   </div>
   </Modal.Body>*/}
   <Alert variant="danger" >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>

      </Modal>
      </>
      
   );
}
