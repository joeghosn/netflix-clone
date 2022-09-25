import Head from "next/head";
import NavBar from "../../components/navBar/navBar";

import CardSection from "../../components/cardSection/cardSection";

import styles from "../../styles/mylist.module.css";
import { getFavouritedVideosByUser } from "../../lib/videos";
import { verifyToken } from "../../utils/utils";

export async function getServerSideProps(context){
    const cookie= context.req? context.req?.cookies.token: null;

    const issuer= await verifyToken(cookie);
    
    if(!issuer){
      return{
    props:{},
 
    
      }
    } 


const favouritedMovies=await getFavouritedVideosByUser(cookie,issuer);

    return{
props:{
favouritedMovies,
}
        
    }
}

const MyList = ({favouritedMovies}) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <CardSection
            title="My List"
          movies={favouritedMovies}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;