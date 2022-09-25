
import styles from '../styles/Home.module.css';

import Head from 'next/head';

import Jwt  from 'jsonwebtoken';


//Components Imports:
import Banner from '../components/banner/banner';
import NavBar from '../components/navBar/navBar';

import CardSection from '../components/cardSection/cardSection';

//Methods Imports:
import { getPopularVideos, getVideos, getWatchedVideosByUser } from '../lib/videos';
import { verifyToken } from '../utils/utils';

export async function getServerSideProps(context){
const cookie= context.req? context.req?.cookies.token: null;

const issuer= await verifyToken(cookie);

if(!issuer){
  return{
props:{},


  }
} 







const userWatchedVideos=await getWatchedVideosByUser(cookie,issuer);





const disneyVideos= await getVideos('disney trailer');
const productivityVideos= await getVideos('productivity');
const scienceFictionVideos=await getVideos('marvel trailer');
const popularVideos= await getPopularVideos('popular');

return {
  props: {
disneyVideos,
productivityVideos,
scienceFictionVideos,
popularVideos,
userWatchedVideos,
  },
}

}
export default function Home({disneyVideos,productivityVideos,scienceFictionVideos,popularVideos, userWatchedVideos}) {



  


const movies=[
{
disneyVideos,
productivityVideos,
scienceFictionVideos,
popularVideos,
userWatchedVideos,
}


]

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="Netflix" content="Netflix Clone User Interface" />
        <link rel="icon" href="/assets/netflix-logo.png" />
      </Head>


<h1>Netflix</h1>
   <NavBar username={'Joeghosn2001@outlook.com'}/>

  <Banner title={'Thor'} subTitle={'Love and Thunder'} imgUrl={'/assets/thor-loveandthunder.jpg'} videoId={'8Y3_5N_dpAE'}/>


<div className={styles.sectionWrapper}>
<CardSection sectionTitle={'Disney'} movies={movies[0].disneyVideos} size={'large'}/>
<CardSection sectionTitle={'Watch It Again'} movies={movies[0].userWatchedVideos} size={'small'}/>
<CardSection sectionTitle={'Marvel'} movies={movies[0].scienceFictionVideos} size={'small'}/>
<CardSection sectionTitle={'Productivity'} movies={movies[0].productivityVideos} size={'medium'}/>
<CardSection sectionTitle={'Popular'} movies={movies[0].popularVideos} size={'small'}/>
</div>


 
  




    </div>
  )
}
