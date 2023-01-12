import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { Button, Form, Modal } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContext';
import { API } from '../../config/api';

function Register() {
	const contexts = useContext(AppContext)
   const [form, setForm] = useState({
      name: '',
      email: '',
      username: '',
      password: '',
      role: '',
   });

   const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const HandleOnSubmit = useMutation( async(e) => {
      try {
      e.preventDefault()
    
      const response = await API.post('/register', form)
  
      //console.log("data berhasil ditambahkan", response.data.data)

      contexts.setShowRegister(false)
  
      } catch (err) {
        console.log(err)
  
      }
    })

   return (
      <Modal show={contexts.showRegister} onHide={() => contexts.setShowRegister(false)} centered>
         <Modal.Body className='rounded-0 px-5' style={{backgroundColor: "#f4e1e1"}}>
         <Modal.Title className="my-4 fw-bolder fs-1 text-center" style={{color: "#484646"}}>Register</Modal.Title>
         {/* onSubmit={(e) => contexts.handlerRegister.mutate(e)} */}
         <Form onSubmit={(e) => HandleOnSubmit.mutate(e)}>
            {contexts.regisMessage !== '' && (contexts.regisMessage)}
            <Form.Group className="mb-4">
               <Form.Control
                  className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-5'
                  style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "2px solid #484646"}}
                  type="text"
                  name="name"
                  placeholder="Name"
                  // value={contexts.regisData.email}
                  onChange={handleChange}
               />
            </Form.Group>
            <Form.Group className="mb-4">
               <Form.Control
                  className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-5'
                  style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "2px solid #484646"}}
                  type="email"
                  name="email"
                  placeholder="Email"
                  // value={contexts.regisData.email}
                  onChange={handleChange}
               />
            </Form.Group>
            <Form.Group className="mb-4">
               <Form.Control
                  className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-5'
                  style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "2px solid #484646"}}
                  type="text"
                  name="username"
                  placeholder="Username"
                  // value={contexts.regisData.name}
                  onChange={handleChange}
               />
            </Form.Group>
            <Form.Group className="mb-4">
               <Form.Control
                  className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-5'
                  style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "2px solid #484646"}}
                  type="password"
                  name="password"
                  placeholder="Password"
                  // value={contexts.regisData.password}
                  onChange={handleChange}
               />
            </Form.Group>

            {/*<Form.Group className="mb-4">
               <Form.Select
               className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-5'
               style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "2px solid #484646"}}
               name='role'
               // value={contexts.regisData.role}
               onChange={handleChange}
               >
                  <option>Choose Role</option>
                  <option value='customer'>As Customer</option>
                  <option value='admin'>As Admin</option>
               </Form.Select>
   </Form.Group>*/}
            
            <Form.Group className="mb-4 mt-5">
               <Button variant='' className="w-100 fs-4 fw-bold text-white pt-1" style={{backgroundColor: "#ff5555"}} type='submit'>Register</Button>
            </Form.Group>
         </Form>
         <p className="text-muted text-center mb-4">
            <span>Already have an account ? Click </span>
            <span
               style={{ cursor: 'pointer' }}
               className="text-primary fw-semibold text-muted"
               onClick={() => {
                  contexts.setShowRegister(false);
                  contexts.setShowLogin(true);
               }}
            >
               Here
            </span>
         </p>
         </Modal.Body>
      </Modal>
   );
}

export default Register;