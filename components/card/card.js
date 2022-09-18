import styles from './card.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useState } from 'react';


import {motion} from 'framer-motion';
import cls from 'classnames';






const Card=({size='medium', thumbnail='/assets/netflix-logo.png',  id, title,description,publishedDate})=>{

    const [imgSrc,setImgSrc]=useState(thumbnail);

const classMap={
'large': styles.lgItem,
'medium':styles.mdItem,
'small':styles.smItem,

}

const scale= id===0? {scaleY:1.1}:{scale:1.1};
const router=useRouter();
    const handleError=()=>{
setImgSrc('/assets/netflix-logo.png');

    }

return(
    <div className={styles.container} >

<motion.div className={cls( styles.imgMotionWrapper ,classMap[size])}  whileHover={{...scale}}>
<Image src={imgSrc} alt='Card Image' layout='fill' className={styles.cardImg} onError={handleError}/>

</motion.div>


    </div>
);

}

export default Card;