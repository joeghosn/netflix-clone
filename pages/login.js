import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles/login.module.css';

import { useState, useEffect } from "react";
import {useRouter} from 'next/router'

import { loginUserWithMagicLink } from "../lib/magic-client";

const Login=()=>{

const [userMsg,setUserMsg]=useState(true);
const [email,setEmail]=useState('');
const [isLoading,setIsLoading]=useState(false);

const router=useRouter();

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
    const handleOnChangeEmail=(event)=>{
        setUserMsg('');
const email=event.target.value;
setEmail(email);
    }

    const handleSignInWithEmail=async (event)=>{

event.preventDefault();

if(email ){
    setUserMsg('');
   
        setIsLoading(true);
        const didToken=await loginUserWithMagicLink(email);
       
        if(didToken){

            const response= await fetch('/api/login', {
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${didToken}`,
                    'content-type': 'application/json',

                }
            });

            const loggedInResponse= await response.json();

            if(loggedInResponse.done){
              console.log({loggedInResponse});
            router.push('/');
            }
            else{
                setIsLoading(false);
               setUserMsg('Something Went Wrong Loggin In');
            }
           
   
        }
       
   
    
 
    
    }
    else{
        setUserMsg('Enter A Valid Email Adress');
    }
    }

    return (
    <div  className={styles.container}>
        <Head>
            <title>Sign In</title>
        </Head>
<header className={styles.header}>
    <div className={styles.headerWrapper}>
    <Link href="/">
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/assets/netflix-logo.png"
              alt="Netflix logo"
              width="128px"
              height="34px"
            />
          </div>
        </a>
      </Link>
    </div>
    </header>

<main className={styles.main}>

    <div className={styles.mainWrapper}>
    <h1 className={styles.signinHeader}>Sign In With Email</h1>
    
<input type={'email'} placeholder={'Email Adress'} className={styles.emailInput} onChange={handleOnChangeEmail}/>
<p className={styles.userMsg}>{userMsg}</p>
<button onClick={handleSignInWithEmail} className={styles.loginBtn}>{isLoading?'Loading...':'Sign In'}</button>
    </div>

</main>


       
    </div>
    
    )
}

export default Login;