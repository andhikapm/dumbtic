import { Header } from "../components/LandingPage/Header";
import CategoryList from "../components/LandingPage/CategoryList";
import Upcoming from "../components/LandingPage/UpcomingEvents";
import Footer from "../components/Footer";
import TodayEvent from "../components/LandingPage/TodayEvents";
import { API } from '../config/api';

export const LandingPage = () => {
   
   API.patch("/checkevent")
  
   return (
      <>
         <Header/>
         <CategoryList/>
         <TodayEvent/>
         <Upcoming/>
         <Footer/>
      </>
   );
};