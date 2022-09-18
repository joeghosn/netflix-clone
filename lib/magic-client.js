
import { Magic } from 'magic-sdk';

const createMagic=()=>{

    return (typeof window!=='undefined' && 
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)); 
}

export const magic=createMagic();

export const loginUserWithMagicLink=async(email)=>{

    try {
        const didToken=await magic.auth.loginWithMagicLink({ email});
      return didToken;
      } catch(error) {
       console.log({error});
      }

}


