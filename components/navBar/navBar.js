import styles from './navBar.module.css';

import Image from 'next/image';
import Link  from 'next/link';

import { useRouter} from 'next/router';
import { useState, useEffect } from 'react';

import { magic} from '../../lib/magic-client';

const NavBar= ()=>{

const [showDropDown,setShowDropDown]=useState(false);
const [username,setUserName]=useState('');



    const router=useRouter();

    useEffect(()=>{
      const retrieveUserMetaData=async()=>{

        try {
          const { email, issuer} = await magic.user.getMetadata();
          const didToken=await magic.user.getIdToken();
          console.log({didToken});
          if(email){
        setUserName(email);
          }
        } catch(error) {
          console.log({error});
        }
        
      }
      retrieveUserMetaData();
     

    },[]);

    const handleHome=(event)=>{

        event.preventDefault()
        router.push('/');
    }

    const handleMyList=(event)=>{
        event.preventDefault()
    router.push('/browse/MyList') ;   
    }
    const handleDropDown=(event)=>{
        event.preventDefault();
setShowDropDown(!showDropDown);

    }

    const handleSignOut=async(event)=>{
      event.preventDefault();
      try {
        const isLoggedOut=await magic.user.logout();
       console.log({isLoggedOut});
        router.push('/login');
      } catch(error){
       console.log({error});
       router.push('/login');
      }


    }
return(
    <div className={styles.container}>
    <div className={styles.wrapper}>
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

      <ul className={styles.navItems}>
       
        <li className={styles.navItem} onClick={handleHome}>
          Home
        </li> 
        
      
    
        <li className={styles.navItem2} onClick={handleMyList}>
          My List
        </li>
     
     

      
       
      </ul>
      <nav className={styles.navContainer}>
        <div>
          <button className={styles.usernameBtn} onClick={handleDropDown}>
            <p className={styles.username}>{username}</p>
            {/** Expand more icon */}
            <Image
              src={"/assets/expand_more.svg"}
              alt="Expand dropdown"
              width="24px"
              height="24px"
    
            />
          </button>

          {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  
                  <a className={styles.linkName}  onClick={handleSignOut} >
                    Sign out
                  </a>
                 
                
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}

        </div>
      </nav>
    </div>
  </div>
);

}

export default NavBar;