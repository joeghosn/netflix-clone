import '../styles/globals.css';

import {magic} from '../lib/magic-client';
import Loading from '../components/Loading/Loading';

import {useRouter} from 'next/router';
import { useEffect,useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [isLoading,setIsLoading]=useState(true);
  const router=useRouter();

useEffect(()=>{
 
  const ShowCorrectRoute=async()=>{
    
const isLoggedIn= await magic.user.isLoggedIn();
if(isLoggedIn){
  router.push('/');
}else{
  router.push('login');
}


  };

  ShowCorrectRoute();
},[]);

useEffect(()=>{
  const handleRouteChange=()=>{
  setIsLoading(false);
  }
  router.events.on('routeChangeComplete', handleRouteChange);
  router.events.on('routeChangeError', handleRouteChange);
  return()=>{
  
      router.events.off('routeChangeComplete',handleRouteChange);
      router.events.off('routeChangeError', handleRouteChange)
  }
  
  

  
  
  },[router]);



  return (isLoading?<Loading/> :<Component {...pageProps} />)
}

export default MyApp
