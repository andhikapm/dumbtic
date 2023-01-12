import React, { useContext, useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContext';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { UserContext } from '../../contexts/UserContext';

function Login() {
   const contexts = useContext(AppContext)
   const [state, dispatch] = useContext(UserContext);
   const [message, setMessage] = useState(null);
   const [form, setForm] = useState({
      username: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
   };

   const HandleOnSubmit = useMutation(async (e) => {
      try {
        e.preventDefault()
  
        const response = await API.post('/login', form)
  
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data
        })
        
        //console.log("data berhasil ditambahkan", response.data.data)

        const resUser = await API.get(`/user/${response.data.data.id}`);
        contexts.setProfileUser(resUser.data.data)

        contexts.setShowLogin(false)
      
      } catch (err) {
         const alert = (
            <Alert variant="danger" className="py-1">
              Login failed
            </Alert>
          );
          setMessage(alert);
        console.log(err)
      
      }
   })

   return (
      <Modal show={contexts.showLogin} onHide={() => contexts.setShowLogin(false)} centered>
         <Modal.Body className='rounded-0 px-5' style={{backgroundColor: "#f4e1e1"}}>
            <Modal.Title className="my-4 fw-bolder fs-1 text-center" style={{color: "#484646"}}>LOGIN</Modal.Title>
            {/* onSubmit={(e) => contexts.handlerLogin.mutate(e)} */}
            <Form onSubmit={(e) => HandleOnSubmit.mutate(e)}>
               {message && message}
               <Form.Group className="mb-4">
                  <Form.Control
                     className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-5'
                     style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "2px solid #484646"}}
                     type="text"
                     name="username"
                     placeholder="Username"
                     // value={contexts.loginData.email}
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
                     // value={contexts.loginData.password}
                     onChange={handleChange}
                  />
               </Form.Group>
               <Form.Group className="mb-4 mt-5">
                  <Button type="submit" variant='' className="w-100 fs-4 fw-bold text-white pt-1" style={{backgroundColor: "#ff5555"}}>Login</Button>
               </Form.Group>
               
            </Form>
            <p className="text-muted text-center mb-4">
               <span>Don't have an account ? click </span>
               <span
                  style={{ cursor: "pointer" }}
                  className="text-primary fw-semibold text-muted"
                  onClick={() => {
                     contexts.setShowLogin(false);
                     contexts.setShowRegister(true);
                  }}
               >
                  Here
               </span>
            </p>
         </Modal.Body>
      </Modal>
   );
}

export default Login;