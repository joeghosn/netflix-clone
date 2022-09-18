//Create the new user:

export async function createNewUser (token, issuer, publicAddress, email, ){

  const mutation = `
  mutation CreateNewUser($issuer: String! , $publicAddress: String! , $email: String! ) {
    insert_users(objects: {email: $email , issuer: $issuer , publicAdress: $publicAddress}) {
      affected_rows
    }
  }
`;
  

const response= await fetchGraphQL(mutation,
    "CreateNewUser",
    {issuer,
      publicAddress,
      email
    
    },
token,
)

console.log({response});

return response?.data?.users?.length !== 0;



} 

//Check if the user exits:
export async function isNewUser (token, issuer){
  const query = `
  query IsNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer }}) {
      email
      id
      issuer
      publicAdress
    }
  }
  `;


  

const response= await fetchGraphQL(query,
    "IsNewUser",
    {issuer
    
    },
token,
)


return response?.data.users?.length !== 0;



} 

//Find if the video liked or watched by the user already exists:
export const findVideoIdByUserId=async(userId, videoId, token)=>{

  const query = `
  query FindVideoIdByUserId ($userId: String! , $videoId: String!) {
    stats(where: {userId: {_eq: $userId }, videoId: {_eq: $videoId} } ) {
      id
      userId
      videoId
      favourited
      watched
    }
  }
  `;

  const response= await fetchGraphQL(query,
    "FindVideoIdByUserId",
    {userId,
    videoId,
      
    
    },
token,
)



console.log(`Video found is: ${response.data.stats}`);

return response?.data?.stats?.length !== 0?response.data.stats:[];


  }

//Create new data for the videoId according to the userId:
export const createVideoIdByUserId=async(token,userId,videoId,favourited,watched)=>{


  const mutation = `
  mutation CreateVideoIdByUserId($userId: String!, $videoId: String! $favourited: Int! $watched: Boolean!) {
    insert_stats_one(object: {favourited: $favourited, userId: $userId, videoId: $videoId , watched: $watched}) {
      favourited
      id
      userId
      videoId
      watched
    }
  
  }
`;
const response= await fetchGraphQL(mutation,
  "CreateVideoIdByUserId",
  {userId,
  videoId,
  favourited,
  watched,
    
  
  },
token,
)



  return response?.data?.insert_stats_one?.length!==0?response.data.insert_stats_one:[];
}
//update stats based on primary Key, videoId and UserId:

export const updateStats=async(token,userId,videoId,favourited,watched)=>{

  const mutation = `
  mutation updateStats($userId: String!, $videoId: String! $favourited: Int! $watched: Boolean!){
    update_stats(where: {userId: {_eq: $userId }, videoId: {_eq: $videoId}}, _set: {watched:  $watched, favourited: $favourited }) {
      returning {
        videoId
        userId
        id
        favourited
        watched
      }
    }
  }
`;
const response= await fetchGraphQL(mutation,
  "updateStats",
  {userId,
  videoId,
  favourited,
  watched,
 
    
  
  },
token,
)





  return response?.data?.update_stats?.length!==0? response.data.update_stats.returning:[];
}
//get watched videos:
export const getWacthedVideos=async(token,userId)=>{

  const mutation = `
  query getWacthedVideos($userId: String! ) {
    stats(where: {userId: {_eq: $userId}, watched: {_eq: true}}) {
     
      videoId
      
    }
  }
`;
const response= await fetchGraphQL(mutation,
  "getWacthedVideos",
  {userId,
 
  
 
    
  
  },
token,
)




  return response?.data?.stats?.length!==0? response.data.stats:[];
}
//get favourited videos:
export const getfavouritedVideos=async(token,userId)=>{

  const mutation = `
  query getFavouritedVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId}, favourited:{_eq: 1}}) {
      videoId
    }
  }
`;
const response= await fetchGraphQL(mutation,
  "getFavouritedVideos",
  {userId,
 
  
 
    
  
  },
token,
)

console.log({response});
console.log(`favourited videos are: ${response.data.stats}`);


  return response?.data?.stats?.length!==0? response.data.stats:[];
}



 export async function fetchGraphQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
    {
      method: "POST",
      headers:{
        'x-hasura-admin-secret':process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  'Authorization': `Bearer ${token}`,
  'content-type': 'application/json',
              },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}












