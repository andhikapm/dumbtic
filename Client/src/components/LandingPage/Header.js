import { useContext } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import search from '../../assets/search.png';
import { AppContext } from "../../contexts/AppContext";
import { UserContext } from "../../contexts/UserContext";

export const Header = () => {
   const contexts = useContext(AppContext);
   const [state,] = useContext(UserContext);

   return (
      <Container
         className="position-relative"
         style={{padding : "0 24px", marginTop : "200px", marginBottom : "40px"}}
      >
         <div className="mb-4">
            <Form className="d-flex position-relative">
               <Form.Control
                  className='border-start-0 border-end-0 border-top-0 rounded-0 px-1 fs-3'
                  style={{backgroundColor: "rgba(0,0,0,0)", borderBottom: "3px solid #484646"}}
                  type="search"
                  placeholder="Search Event"
                  
               />
               <Button className="position-absolute border-0" style={{backgroundColor: "rgba(0,0,0,0)", top: "4px", right: "-6px"}}>
                  <img width="32px" src={search}/>
               </Button>
            </Form>
         </div>
         
      </Container>
   );
};