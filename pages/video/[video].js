import { useRouter } from "next/router";
import styles from '../../styles/video.module.css';

import Modal from 'react-modal';
import NavBar from "../../components/navBar/navBar";
import Like from "../../components/icons/like";
import Dislike from "../../components/icons/dislike";

import classNames from 'classnames';

Modal.setAppElement('#__next');

import { getYoutubeVideoById } from "../../lib/videos";
import { useState, useEffect } from "react";
export async function getStaticProps({params}){
const {video}=params;

const videoData= await getYoutubeVideoById(video);



return{
props:{
videoData: videoData.length>0?videoData[0]:{},

},
revalidate:10,

}
}
export async function getStaticPaths(){
    const videoIds=['8Y3_5N_dpAE'];

const paths= videoIds.map((videoId)=>{
    return {
         params: {video:videoId},
    }
})

return{
    paths,
    fallback:'blocking',
}


}


const VideoPlayer=({videoData})=>{
const [isliked,setIsLiked]=useState(false);
const [isDisliked,setIsDisliked]=useState(false);

const router=useRouter();

const {video}=router.query;

useEffect(()=>{
const findVideoStateById=async()=>{

  const response=await fetch(`/api/stats?videoId=${video}`,{
method:'GET',
headers:{
'Content-Type':'application/json',

},


  });
  const data= await response.json();
  if(data.findVideoById.length!==0 ){
    const {favourited}=data.findVideoById[0];
  
 
    if(favourited===1){
      setIsLiked(true);
     
    }else{
 
      setIsDisliked(true);
    }

  }
 
  



}
findVideoStateById();

},[])

const handleLike= async ()=>{
setIsLiked(true);
setIsDisliked(false);

const response= await fetch('/api/stats', {
method:'POST',
headers:{
"content-type":'application/json',

},
body: JSON.stringify(
  {
videoId: video,
favourited: 1,
  }
),


});
console.log('data', await response.json(), isliked);
}

const handleDislike=async()=>{

  setIsLiked(false);
  setIsDisliked(true);

  const response= await fetch('/api/stats', {
    method:'POST',
    headers:{
    "content-type":'application/json',
    
    },
    body: JSON.stringify(
      {
    videoId: video,
    favourited: 0,
      }
    ),
    
    
    });
    console.log('data', await response.json(), isliked);
}

    const {
        title,
        publishDate,
        description,
        channelTitle,
        statistics: { viewCount }= {viewCount:0} ,
      } = videoData;
   




    return (
<div className={styles.container}>
    <NavBar/>
    <Modal
  isOpen={true}
  contentLabel="Watch the video"
  onRequestClose={() => router.back()}
  className={styles.modal}
  overlayClassName={styles.overlay}
>
  <iframe
    id="ytplayer"
    className={styles.videoPlayer}
    type="text/html"
    width="100%"
    height="360"
    src={`https://www.youtube.com/embed/${video}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
    frameBorder="0"
  ></iframe>


<div className={styles.likeDislikeBtnWrapper}>

<div className={styles.likeBtnWrapper}>
<button onClick={handleLike}>
<div className={styles.btnWrapper}>
  <Like selected={isliked}/>
</div>
</button>
</div>


<button onClick={handleDislike}>
<div className={styles.btnWrapper}>
  <Dislike selected={isDisliked}/>
</div>
</button>

</div>

 
  <div className={styles.modalBody}>
    <div className={styles.modalBodyContent}>
      <div className={styles.col1}>
        <p className={styles.publishTime}>{publishDate}</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.col2}>
        <p className={classNames(styles.subText, styles.subTextWrapper)}>
          <span className={styles.textColor}>Cast: Netflix </span>
          <span className={styles.channelTitle}>{channelTitle}</span>
        </p>
        <p className={classNames(styles.subText, styles.subTextWrapper)}>
          <span className={styles.textColor}>View Count:  </span>
          <span className={styles.channelTitle}>{viewCount}</span>
        </p>
      </div>
    </div>
  </div>
</Modal>
   

</div>
    )
}

export default VideoPlayer;