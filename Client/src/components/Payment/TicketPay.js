import React, { useContext, useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { AppContext } from '../../contexts/AppContext';
import { UserContext } from '../../contexts/UserContext';
import { API } from '../../config/api';
import { useQuery } from 'react-query';
import moment from 'moment';

const TicketPayment = (props) => {
    const navigate = useNavigate();
    const contexts = useContext(AppContext);
    const [state,] = useContext(UserContext);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (props.event.price !== 0){
            setTotal(props.event.price * props.qty)
        }
     }, [])

     useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
      
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
      
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
    }, []);

    const PayTic = async() => {
        try {
            const response = await API.post('/transaction', {
                ticket_id: parseInt(props.id),
                price: parseInt(total),
            })
            
            const token = response.data.data.token;
      
            //console.log("response post transaction", response)
            //console.log("ini tokennya", token)
      

            window.snap.pay(token, {
                onSuccess: function (result) {
                  //console.log(result);
                },
                onPending: function (result) {
                  //console.log(result);
                },
                onError: function (result) {
                  //console.log(result);
                },
                onClose: function () {
                  alert("you closed the popup without finishing the payment");
                },
              });
    
        } catch (err) {
          console.log(err)
    
        }
      }

    return (
      <>
        <div>
            <div className='position-relative py-4 ps-5 pe-4 mb-3' style={{backgroundColor: "#ff5555"}}>
                <div 
                className='bg-light rounded-circle position-absolute' 
                    style={{height: '70px', width: '40px', left: '-22px', top: '50px'}}>
                </div>
                <div 
                    className='bg-light rounded-circle position-absolute' 
                    style={{height: '70px', width: '40px', left: '-22px', top: '150px'}}>
                </div>
                <Card 
                    className='border-0 py-0 bg-light rounded-0' 
                    style={{ width: '100%', backgroundColor : '#f4dcdc', cursor: 'pointer', borderColor: '#acacac', boxShadow: "0 2px 4px rgba(0, 0, 0, .3)" }} 
                    key={"item.id"} 
                    onClick={() => {}}
                >  
                    <Card.Body className='px-0 py-0'>
                        <div className='d-flex align-items-center px-4' style={{backgroundColor: "#bcbcbc"}}>
                            <p className='col-6 fw-semibold fs-4 mb-0' style={{color: "#454545"}}>Is Bos</p>
                            <p className='col-6 text-end mb-0' style={{color: "#454545"}}>Face value Rp. {props.event.price}</p>
                        </div>
                        <div className='d-flex align-items-center px-4' style={{backgroundColor: "#bcbcbc"}}>
                            <p className='col-6 fs-5 mb-1 text-muted'>id.users</p>
                            <p className='col-6 text-end fs-5 mb-1 text-muted'>id.confirm</p>
                        </div>
                    </Card.Body>
                    <Card.Body className='position-relative flex align-items-center pt-3 px-4'>
                        <h2 className='fw-bolder' style={{color: "#454545"}}>{props.event.title}</h2>
                        <p className='fs-5 fw-semibold mb-1 text-muted'>
                          {moment(new Date(props.event.startdate)).format("D MMM YYYY H.mm")}
                        </p>
                        <p className='text-muted' style={{fontSize: "1.1rem"}}>{props.event.address}</p>
                    </Card.Body>
                </Card>
            </div>
            <div style={{ borderBottom: "3px solid gray"}} className="px-5 text-muted">
                <h3 className='fs-4 fw-semibold'>Order Summary</h3>
                <div className='d-flex justify-content-between' style={{fontSize: "1.1rem"}}>
                    <p>Total Price ({props.qty} Item)</p>
                    <p>Rp. {total}</p>
                </div>
            </div>
            <div className='d-flex justify-content-end pt-4' style={{marginBottom: "80px"}}>
                <Button onClick={PayTic} className='border-0 py-2 fs-5 fw-bold' style={{backgroundColor: "#ff5555", width: "180px"}}>Confirm</Button>
            </div>
        </div>
      </>
   );
}

export default TicketPayment;

