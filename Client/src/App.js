import "bootstrap/dist/css/bootstrap.min.css";

import Navibar from "./components/Navbar/Navibar";
import { LandingPage } from "./pages/LandingPage";

import { Route, Routes } from 'react-router-dom'
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { useContext, useEffect } from "react";
import { AppContext } from "./contexts/AppContext";
import MyTicket from "./pages/MyTickets";
import AddEvent from "./pages/AddEvent";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import DetailEvent from "./pages/DetailEvent";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./contexts/UserContext";
import Category from "./pages/Category";

function App() {
   const contexts = useContext(AppContext)
   // useEffect(() => {contexts.checkUserAuth()}, []);
   const [state, dispatch] = useContext(UserContext);

   if (localStorage.token) {
      setAuthToken(localStorage.token);
   }

   const checkUser = async () => {
      try {
        const response = await API.get('/checkauth');
    
        if (response.status === 404) {
          return dispatch({
            type: 'AUTH_ERROR',
          });
        }
    
        let payload = response.data.data;
        payload.token = localStorage.token;

        //console.log(response.data.data)
    
        dispatch({
          type: 'USER_SUCCESS',
          payload,
        });

        const res = await API.get(`/user/${response.data.data.id}`);
        contexts.setProfileUser(res.data.data)
        
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      checkUser();
    }, []);

   return (
      <>
         <Navibar />
         <Login />
         <Register /> 
         <Routes>
            <Route exact path='/' element={<LandingPage/>} ></Route>
            <Route exact path='/profile' element={<Profile/>} ></Route>
            <Route exact path='/myticket' element={<MyTicket/>} ></Route>
            <Route exact path='/payment' element={<Payment/>} ></Route>
            <Route exact path='/add-event' element={<AddEvent/>} ></Route>
            <Route exact path='/category/:category' element={<Category/>}></Route>
            <Route exact path='/detail-event/:id' element={<DetailEvent/>}></Route>
            {/* <Route exact path='/mycart' element={<MyCart/>}></Route>
            <Route exact path='/customer/myprofile' element={<MyProfile/>}></Route>
            <Route exact path='/admin/transaction' element={<Transactions/>}></Route> */}
         </Routes>
      </>
   );
}

export default App;