import { createContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API, setAuthToken  } from '../config/api';
import { UserContext } from './UserContext';


export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

   const [state, dispatch] = useContext(UserContext);

   // ==================================================================================================================================
   // GLOBAL STATES ====================================================================================================================
   // ==================================================================================================================================

   const [isLogin, setIsLogin] = useState(false);
   const [loginMessage, setLoginMessage] = useState('');
   const [regisMessage, setRegisMessage] = useState('');
   const [showLogin, setShowLogin] = useState(false);
   const [showRegister, setShowRegister] = useState(false);
   const [profilePhoto, setProfilePhoto] = useState();
   const [profileUser, setProfileUser] = useState();
   // const [cartLength, setCartLength] = useState();
   const [showLoading, setLoading] = useState(false);
   const [showModMess, setShowModMess] = useState(false);
   // ==================================================================================================================================
   // FORMAT CURRENCY ==================================================================================================================
   // ==================================================================================================================================

   let formatCurrency = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
   });

   // ==================================================================================================================================
   // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // ==================================================================================================================================
   // ////////////////////////////////////////////////////// HANDLER AUTH //////////////////////////////////////////////////////////////
   // ==================================================================================================================================
   // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // ==================================================================================================================================

   // ==================================================================================================================================
   // CHECK USER AUTH ==================================================================================================================
   // ==================================================================================================================================

   const checkUserAuth = async () => {
      try {
         if (localStorage.token) {
            setAuthToken(localStorage.token);
            const response = await API.get("/check-auth");
            let payload = response.data.data;
            console.log(payload.image);
            payload.token = localStorage.token;
      
            dispatch({
               type: "USER_SUCCESS",
               payload,
            });

            setProfilePhoto(payload.image)
            setIsLogin(true)
         }
      } catch (error) {
        console.log(error);
      }
   };

   // useEffect(() => {
   //    checkUserAuth()
   // }, [showLogin])

   // ==================================================================================================================================
   // HANDLER REGISTER =================================================================================================================
   // ==================================================================================================================================

   const [regisData, setRegisData] = useState({
		name: '',
		email: '',
      userName: '',
		password: '',
	});

   const OnChangeFormRegis = (e) => setRegisData({ ...regisData, [e.target.name]: e.target.value })

	const handlerRegister = useMutation(async(e) => {
		try {
			e.preventDefault();

			const config = {headers: {"Content-type": "application/json"}}
			const body = JSON.stringify(regisData);
			await API.post('/register', body, config);

			setShowRegister(false);
			setShowLogin(true);
			setRegisMessage('');
			setRegisData({name: '', email: '', userName: '', password: ''});

		} catch (error) {
			const alert = (
				<Alert className='fs-6 fw-bolder text-center' variant={'danger'}>
					{error.response.data.message}
				</Alert>
			);
			setRegisMessage(alert);
		}
	});

   // ==================================================================================================================================
   // HANDLER LOGIN ====================================================================================================================
   // ==================================================================================================================================

   const [loginData, setLoginData] = useState({
      userName: "",
      password: ""
   });

   const OnChangeFormLogin = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value })

   const handlerLogin = useMutation(async(e) => {
      try {
         e.preventDefault();

         const config = {headers: {"Content-type": "application/json"}}
         const body = JSON.stringify(loginData);
         const response = await API.post("/login", body, config);
         // console.log(response.data.data);
         dispatch({type: "LOGIN_SUCCESS", payload: response.data.data});

         setIsLogin(true);
         setShowLogin(false);
         setLoginMessage('');
         setLoginData({userName: "", password: ""})

      } catch (err) {
         const alert = (
            <Alert className='fs-6 fw-bolder text-center' variant={'danger'}>
               {err.response.data.message}
            </Alert>
         );
         setLoginMessage(alert);
      }
   });

   // ==================================================================================================================================
   // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // ==================================================================================================================================
   // /////////////////////////////////////////////////////// HANDLER NAVBAR ///////////////////////////////////////////////////////////
   // ==================================================================================================================================
   // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // ==================================================================================================================================

   const refreshNavbar = async () => {
      try {
         const response = await API.get(`/user/${state.user.id}`);
         let payload = response.data.data;
         setProfilePhoto(payload.image)
      } catch (error) {
        console.log(error);
      }
   };

   // ==================================================================================================================================
   // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // ==================================================================================================================================
   // //////////////////////////////////////////////////// HANDLER lANDINGPAGE /////////////////////////////////////////////////////////
   // ==================================================================================================================================
   // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // ==================================================================================================================================

   // let { data: products } = useQuery("productsCache", async () => {
   //    const response = await API.get("/products");
   //    return response.data.data;
   // });

   // ==================================================================================================================================
   // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // ==================================================================================================================================
   // ////////////////////////////////////////////////// HANDLER PRODUCT DETAIL ////////////////////////////////////////////////////////
   // ==================================================================================================================================
   // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // ==================================================================================================================================


    
   const appContextsValue = {
      isLogin,
      setIsLogin,
      loginMessage,
      setLoginMessage,
      regisMessage,
      setRegisMessage,
      
      showLogin,
      setShowLogin,
      showRegister,
      setShowRegister,

      profilePhoto,
      refreshNavbar,
      profileUser,
      setProfileUser,
      // cartLength,
      // setCartLength,
      showLoading,
      setLoading,
      showModMess,
      setShowModMess,

      formatCurrency,
      
      checkUserAuth,
      regisData,
      OnChangeFormRegis,
      handlerRegister,
      loginData,
      OnChangeFormLogin,
      handlerLogin,

      // products
   }
   return(
      <AppContext.Provider value={appContextsValue}>
         {children}
      </AppContext.Provider>
   )
}