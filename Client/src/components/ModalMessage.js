import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { AppContext } from '../contexts/AppContext';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export default function ModalMessagePage() {
   const contexts = useContext(AppContext)

   return (
    <>
      <Modal show={contexts.showModMess} onHide={() =>contexts.setShowModMess(false)} centered>
         <Modal.Body className='rounded-2 px-3' style={{backgroundColor: "#32f188"}}>
            <Modal.Title className="my-4 fw-bolder fs-4 text-center" style={{color: "#484646"}}>SUCCESS ADD TICKET</Modal.Title>
           
   </Modal.Body>

      </Modal>
      </>
      
   );
}
