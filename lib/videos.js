
import { getfavouritedVideos, getWacthedVideos } from "./hasura";


export const transformData=async (url)=>{

    const options={
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
    }


   try{
    const BASE_URL="youtube.googleapis.com/youtube/v3";
    const response= await fetch(`https://${BASE_URL}/${url}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`,options);
    const data= await response.json();

 
    const transformedData= data?.items.map((data,idx)=>{
 const id =data.id;
 const videoId= data.id.videoId?data.id.videoId:idx;
console.log({id});


if(data.error){
    console.error('Youtube API Error!');
    
    return [];
}

        return{
    'publishedDate': data.snippet.publishedAt,
    'title':data.snippet.title,
    'description':data.snippet.description,
    'thumbnail':data.snippet.thumbnails.high.url,
    videoId,
    id,
    'statistics': {viewCount: data.statistics.viewCount? data.statistics.viewCount:'Unable to determine View Count'},
    'channelTitle':data.snippet.channelTitle,
        }
    });
    return transformedData;

   }catch(error){
    console.log({error});
    return [];
   }

}


export const getVideos=(searchQuery)=>{
const URL=`search?part=snippet&q=${searchQuery}&type=video`;
return transformData(URL);
}

export const getPopularVideos=()=>{

    const URL="videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=LB";
    return transformData(URL);
    

}

export const getYoutubeVideoById=(videoId)=>{

    const URL=`videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    return transformData(URL);
}
export const getWatchedVideosByUser=async(token,userId)=>{

    const watchedVideos= await getWacthedVideos(token,userId);
return watchedVideos.map((watchedVideo)=>{
    return {
        id: watchedVideo.videoId,
    thumbnail: `https://i.ytimg.com/vi/${watchedVideo.videoId}/maxresdefault.jpg`
    }
})
}

export const getFavouritedVideosByUser=async(token,userId)=>{

    const favouritedVideos= await getfavouritedVideos(token,userId);
return favouritedVideos.map((favouritedVideo)=>{
    return {
        id: favouritedVideo.videoId,
    thumbnail: `https://i.ytimg.com/vi/${favouritedVideo.videoId}/maxresdefault.jpg`
    }
})
}