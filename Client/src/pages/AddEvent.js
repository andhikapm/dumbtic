import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Footer from '../components/Footer';
import { AppContext } from '../contexts/AppContext';
import { UserContext } from '../contexts/UserContext';
import {Tickets} from '../data/DataTicket';
import { API } from '../config/api';
import { useMutation } from 'react-query';

const AddEvent = () => {
   const navigate = useNavigate();

   //API.patch("/checkevent")

   const contexts = useContext(AppContext);
   const [state,] = useContext(UserContext);
   const [form, setForm] = useState({
      title: '',
      category: '',
      image: '',
      startdate: '',
      enddate: '',
      price: '',
      address: '',
      urlMap: '',
      phone: '',
      email: '',
      description: '',
   });

   const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
      });
    };
    
   const HandleOnSubmit =  useMutation(async(e) => {
      try {
         e.preventDefault()
         
         const formData = new FormData();
         formData.set('title', form.title);
         formData.set('category', form.category);
         formData.set('image', form.image[0], form.image[0].name);
         formData.set('startdate', new Date(form.startdate.replace('T',' ').replace('-','/')).toUTCString());
         formData.set('enddate', new Date(form.enddate.replace('T',' ').replace('-','/')).toUTCString());
         formData.set('price', form.price);
         formData.set('address', form.address);
         formData.set('urlMap', form.urlMap);
         formData.set('phone', form.phone);
         formData.set('email', form.email);
         formData.set('description', form.description);

         const response = await API.post('/addevent', formData)
   
         //console.log("data berhasil ditambahkan", response)

         navigate("/")
  
      } catch (err) {
        console.log(err)
  
      }
    })

   return (
      <>
         <Container className='justify-content-between m-auto pb-5 px-4 mb-4' 
            style={{padding : "200px 0 0", marginBottom : "40px"}}
         >
            <h1 className='fw-bolder pb-4' style={{color: "#ff5555"}}>Add Event</h1>
            <div className='pt-5 pb-1' style={{padding: "0 160px"}}>
               <Form onSubmit={(e) => HandleOnSubmit.mutate(e)}>
                  <Form.Group style={{marginBottom: "26px"}}>
                     <Form.Control
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                        type="text"
                        name="title"
                        placeholder="Title Event"
                        // value={contexts.loginData.email}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group style={{marginBottom: "26px"}}>
                     <Form.Select
                     className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4 text-muted'
                     style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                     name='category'
                     // value={contexts.regisData.role}
                     onChange={handleChange}
                     >
                        <option>Choose Category</option>
                        <option value='sport'>Sport</option>
                        <option value='music'>Music</option>
                        <option value='science'>Science</option>
                        <option value='programming'>Programming</option>
                     </Form.Select>
                  </Form.Group>
                  <Form.Group className="position-relative" style={{marginBottom: "26px"}}>
                     <div className='position-absolute' style={{width: "160px", height: "70px", left: "-160px", top: "-10px", backgroundColor: "#f4e1e1"}}></div>
                     <div className='position-absolute text-end' style={{width: "240px", height: "70px", right: "0", top: "-10px", paddingTop: "16px", backgroundColor: "#f4e1e1"}}>
                        <label for="image" className='fs-5 fw-bold py-2 px-4 bg-secondary rounded-2 text-light' style={{cursor: "pointer"}}>Attache Pamflet</label>
                     </div>
                     <Form.Control
                        id="image"
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4 text-muted'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646", marginLeft: "-146px"}}
                        type="file"
                        name="image"
                        placeholder="Upload Pamflet"
                        // value={contexts.loginData.password}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group className="position-relative" style={{marginBottom: "26px"}}>
                     <div className='position-absolute text-end' style={{width: "240px", height: "50px", right: "32px", top: "-10px", paddingTop: "8px"}}>
                        <label for="startTime" className='fs-4 py-2 px-4 text-muted' style={{cursor: "pointer"}}>Start Time</label>
                     </div>
                     <Form.Control
                        id='startTime'
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4 text-muted'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                        type="datetime-local"
                        name="startdate"
                        placeholder="Start Time"
                        // value={contexts.loginData.email}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group className="position-relative" style={{marginBottom: "26px"}}>
                     <div className='position-absolute text-end' style={{width: "240px", height: "50px", right: "32px", top: "-10px", paddingTop: "8px"}}>
                        <label for="endTime" className='fs-4 py-2 px-4 text-muted' style={{cursor: "pointer"}}>End Time</label>
                     </div>
                     <Form.Control
                        id='endTime'
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4 text-muted'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                        type="datetime-local"
                        name="enddate"
                        placeholder="End Time"
                        // value={contexts.loginData.email}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group style={{marginBottom: "26px"}}>
                     <Form.Control
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                        type="number"
                        name="price"
                        placeholder="Price"
                        // value={contexts.loginData.email}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group style={{marginBottom: "26px"}}>
                     <Form.Control
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                        type="text"
                        name="address"
                        placeholder="Address Event"
                        // value={contexts.loginData.email}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group style={{marginBottom: "26px"}}>
                     <Form.Control
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                        type="text"
                        name="urlMap"
                        placeholder="Url Map"
                        // value={contexts.loginData.email}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group style={{marginBottom: "26px"}}>
                     <Form.Control
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                        type="text"
                        name="phone"
                        placeholder="Telp"
                        // value={contexts.loginData.email}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group style={{marginBottom: "26px"}}>
                     <Form.Control
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                        type="email"
                        name="email"
                        placeholder="Email EO"
                        // value={contexts.loginData.email}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group style={{marginBottom: "80px"}}>
                     <Form.Control
                        className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-4'
                        style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "4px solid #484646"}}
                        type="text"
                        name="description"
                        placeholder="Description Event"
                        // value={contexts.loginData.email}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group className="mb-4 mt-5">
                  {HandleOnSubmit.isLoading ? <>
                     <Button variant='' className="w-100 fs-4 fw-bold text-white pt-1" style={{backgroundColor: "#ff5555"}}>
                        <Spinner
                           as="span"
                           animation="border"
                           role="status"
                           aria-hidden="true"
                        />
                        {' '}
                        Loading...
                        </Button>
                     </> : <>
                     <Button variant='' className="w-100 fs-4 fw-bold text-white pt-1" style={{backgroundColor: "#ff5555"}} type='submit'>Publish</Button>
                  </>
                  }
                  </Form.Group>
                  
               </Form>
            </div>
         </Container>

         <Footer/>
      </>
   );
}

export default AddEvent;

